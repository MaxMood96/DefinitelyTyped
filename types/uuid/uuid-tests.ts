/// <reference types="node" />

import {
    MAX as MAX_UUID,
    NIL as NIL_UUID,
    parse as uuidParse,
    stringify as uuidStringify,
    v1 as uuidv1,
    V1Options,
    v1ToV6,
    v3 as uuidv3,
    v4 as uuidv4,
    V4Options,
    v5 as uuidv5,
    v6 as uuidv6,
    V6Options,
    v6ToV1,
    v7 as uuidv7,
    V7Options,
    validate as uuidValidate,
    version as uuidVersion,
} from "uuid";

const randoms = [
    0x10,
    0x91,
    0x56,
    0xbe,
    0xc4,
    0xfb,
    0xc1,
    0xea,
    0x71,
    0xb4,
    0xef,
    0xe1,
    0x67,
    0x1c,
    0x58,
    0x36,
];

let stringv1: string = uuidv1();
stringv1 = uuidv1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
});
stringv1 = uuidv1({
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
    random: randoms,
});
stringv1 = uuidv1({
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
    rng: () => randoms,
});

const v1Options: V1Options = {
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
    rng: () => randoms,
};
stringv1 = uuidv1(v1Options);

let bufferv1 = new Uint8Array(32);
bufferv1 = uuidv1(null, bufferv1);
bufferv1 = uuidv1(undefined, bufferv1, 16);

const stringv16: string = v1ToV6(stringv1);
const bufferv16: Uint8Array = v1ToV6(bufferv1);
const arrayv16: ArrayLike<number> = v1ToV6(uuidv6(undefined, []));

let stringv4: string = uuidv4();
stringv4 = uuidv4({ random: randoms });
stringv4 = uuidv4({ rng: () => randoms });

const v4Options: V4Options = { random: randoms };
stringv4 = uuidv4(v4Options);

let bufferv4: number[] = new Array(32);
bufferv4 = uuidv4(undefined, bufferv4);
bufferv4 = uuidv4(null, bufferv4, 16);

let stringv6: string = uuidv6();
stringv6 = uuidv6({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
});
stringv6 = uuidv6({
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
    random: randoms,
});
stringv6 = uuidv6({
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
    rng: () => randoms,
});

const v6Options: V6Options = {
    msecs: new Date("2011-11-01").getTime(),
    nsecs: 5678,
    rng: () => randoms,
};
stringv6 = uuidv6(v6Options);

let bufferv6 = new Uint8Array(32);
bufferv6 = uuidv6(null, bufferv1);
bufferv6 = uuidv6(undefined, bufferv1, 16);

const stringv61: string = v6ToV1(stringv6);
const bufferv61: Uint8Array = v6ToV1(bufferv6);
const arrayv61: ArrayLike<number> = v6ToV1(uuidv6(undefined, []));

let stringv7: string = uuidv7();
stringv7 = uuidv7({ random: randoms });
stringv7 = uuidv7({ rng: () => randoms });
stringv7 = uuidv7({
    msecs: new Date("2011-11-01").getTime(),
    random: randoms,
});
stringv7 = uuidv7({
    msecs: new Date("2011-11-01").getTime(),
    rng: () => randoms,
});

const v7Options: V7Options = {
    msecs: new Date("2011-11-01").getTime(),
    random: randoms,
};
stringv7 = uuidv7(v7Options);

let bufferv7: number[] = new Array(32);
bufferv7 = uuidv4(undefined, bufferv7);
bufferv7 = uuidv4(null, bufferv7, 16);

// https://github.com/uuidjs/uuid#quickstart---commonjs-recommended
const MY_NAMESPACE = uuidv4();
const a3: string = uuidv3("hello", MY_NAMESPACE);
const b3: string = uuidv3("world", MY_NAMESPACE);
const c3: Buffer = uuidv3("world", MY_NAMESPACE, Buffer.alloc(16));
const d3: number[] = uuidv3("world", MY_NAMESPACE, [], 0);

const e3: string = uuidv3("hello.example.com", uuidv3.DNS);
const f3: string = uuidv3("http://example.com/hello", uuidv3.URL);

const a5: string = uuidv5("hello", MY_NAMESPACE);
const b5: string = uuidv5("world", MY_NAMESPACE);
const c5: Buffer = uuidv5("world", MY_NAMESPACE, Buffer.alloc(16));
const d5: number[] = uuidv5("world", MY_NAMESPACE, [], 0);

const e5: string = uuidv5("hello.example.com", uuidv5.DNS);
const f5: string = uuidv5("http://example.com/hello", uuidv5.URL);

const g = Buffer.alloc(16);
uuidv4(null, g); // $ExpectType Buffer || Buffer<ArrayBuffer>

class CustomBuffer extends Uint8Array {}
const h = new CustomBuffer(10);
uuidv4(null, h); // $ExpectType CustomBuffer

const nil5: string = uuidv5("hello", NIL_UUID);

const stringified: string = uuidStringify(bufferv4);
const parsed: Uint8Array = uuidParse(stringified);

let valid: boolean = uuidValidate(stringv1);
valid = uuidValidate(stringv4);
valid = uuidValidate(a3);
valid = uuidValidate(a5);
valid = uuidValidate(NIL_UUID);
valid = uuidValidate(MAX_UUID);

let version: number = uuidVersion(stringv1);
version = uuidVersion(stringv4);
version = uuidVersion(a3);
version = uuidVersion(a5);
version = uuidVersion(MAX_UUID);
