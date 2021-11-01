import { ParamType,Bytes } from 'ethers/lib/utils';

/**
 * encode parameters
 * @param ethers 
 * @param types 
 * @param values 
 */
export function encodeParameters(
  ethers: any,
  types: Array<string | ParamType>,
  values: Array<any>
) {
  const abi = new ethers.utils.AbiCoder();
  return abi.encode(types, values);
}

/**
 * decode parameters data
 * @param ethers 
 * @param types 
 * @param data 
 */
export function decodeParameters(
  ethers: any,
  types: Array<string | ParamType>,
  data: Bytes | string
) {
  const abi = new ethers.utils.AbiCoder();
  return abi.decode(types, data);
}

/**
 * 
 * @param ethers 
 * @param hash 
 * @param desc 
 * @param confirmation 
 */
export async function wait(
  ethers: any,
  hash: string,
  desc?: string,
  confirmation: number = 1
): Promise<void> {
  if (desc) {
    console.log(`Waiting tx ${hash}. action = ${desc}`);
  } else {
    console.log(`Waiting tx ${hash}`);
  }
  await ethers.provider.waitForTransaction(hash, confirmation);
}
