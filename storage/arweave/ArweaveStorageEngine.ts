import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import multer from 'multer';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { ParsedQs } from 'qs';
import {fileTypeFromBuffer} from 'file-type';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet.js';

const arJWK: JWKInterface = {
  d: process.env.ARWEAVE_d,
  dp: process.env.ARWEAVE_dp,
  dq: process.env.ARWEAVE_dq,
  e: process.env.ARWEAVE_e ?? 'AQAB',
  kty: process.env.ARWEAVE_kty ?? 'RSA',
  n: process.env.ARWEAVE_n ?? '',
  p: process.env.ARWEAVE_p,
  q: process.env.ARWEAVE_q,
  qi: process.env.ARWEAVE_qi,
};

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

export type AdditionalFileInfo = {
  md5hash: string,
};

async function sendTransacton(filename: string, data: Buffer, contentType: string) {
  let transaction = await arweave.createTransaction(
    {
      data: data,
    },
    arJWK,
  );
  // tags
  if (contentType) transaction.addTag("Content-Type", `${contentType}`);
  transaction.addTag("publisher", "JoDW");
  transaction.addTag("filename", filename);
  console.log(transaction);

  await arweave.transactions.sign(transaction, arJWK);

  let uploader = await arweave.transactions.getUploader(transaction);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
  }

  return transaction;
}

export default class ArweaveStorageEngine implements multer.StorageEngine {

  constructor() {}

  _handleFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File> & Partial<AdditionalFileInfo> | undefined) => void): void {
    const fileName = nanoid();
    const fileReadStream = file.stream; // ReadableStream for uploaded file
    const hash = crypto.createHash('md5')

    const _buf = Array<any>();

    fileReadStream
      .on("data", chunk => {
        _buf.push(chunk);
        hash.update(chunk);
      })
      .on("error", (err) => {
        // Error occured during piping 
        console.error(`Error reading input file stream, got ${_buf.length} buffers`);
        callback(err);
      })
      .on("end", () => {
        const dataBuffer = Buffer.concat(_buf);
        fileTypeFromBuffer(dataBuffer)
          .then(contentType => {
            if (contentType) {
              const md5hash = hash.digest('hex');
              // TODO: check hash to check for duplicates
              sendTransacton(fileName, dataBuffer, contentType.mime)
                .then(result => {
                  console.log("uploaded to arweave: ", result);
                  callback(null, {
                    filename: `https://arweave.net/${result?.id}`,
                    mimetype: contentType.mime,
                    size: dataBuffer.length,
                    md5hash: md5hash,
                  });
                })
            } else {
              callback(new Error("unable to determine content type!"));
            }
          });
      })
      .on("finish", () => {
        callback(null, { filename: fileName });
      });
  }

  _removeFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, file: Express.Multer.File, callback: (error: Error | null) => void): void {
    
  }
}