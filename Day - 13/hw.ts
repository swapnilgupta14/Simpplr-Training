type T00 = unknown & null;   // never - no intersection btw unknown & null
type T01 = string & number; //never
type T011 = unknown & undefined; //undefined - intersection of unknown & undefined - undefined
type T02 = unknown & null & undefined; //never
type T03 = unknown & string; // string -- unknown is generic while string is more specific
type T04 = unknown & string[]; //string[]
type T05 = unknown & unknown; //unknown
type T06 = unknown & any; // any


type T10 = unknown | null;  //unknown  -- unknown includes null.
type T11 = unknown | undefined;   // unknown -- unknown includes undefined.
type T12 = unknown | null | undefined;  //unknown includes null, undefined
type T13 = unknown | string;  //unknown - same as above
type T14 = unknown | string[];  //unknown
type T15 = unknown | unknown; //unknown
type T16 = unknown | any;   // any -- any overrides unknown.


function f22(x: unknown) {
  let v1: any = x;     // No error - unknown can be assigned to any
  let v2: unknown = x; // No error- unknown can be assigned to itself
  let v3: object = x;  //Error: unknown is not assignable to type object because it could be a non-object type.
  let v4: string = x;  // Error: unknown could be any type, so it cannot be assigned to string
  let v5: string[] = x;   //Error
  let v6: {} = x;        // No error - {} accepts any non-null and non-undefined value.
  let v7: {} | null | undefined = x;  // No error `unknown` can be assigned to {} | null | undefined.
}

function f11(x: unknown) {
  x.foo; //error
  x[5];  //error
  x();   //error
  new x();   //error
  
  // error in all 4 lines - because x could be anything
}
