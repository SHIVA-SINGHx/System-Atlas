
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ArchitectureProject
 * 
 */
export type ArchitectureProject = $Result.DefaultSelection<Prisma.$ArchitectureProjectPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ArchitectureProjects
 * const architectureProjects = await prisma.architectureProject.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ArchitectureProjects
   * const architectureProjects = await prisma.architectureProject.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.architectureProject`: Exposes CRUD operations for the **ArchitectureProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArchitectureProjects
    * const architectureProjects = await prisma.architectureProject.findMany()
    * ```
    */
  get architectureProject(): Prisma.ArchitectureProjectDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ArchitectureProject: 'ArchitectureProject'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "architectureProject"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ArchitectureProject: {
        payload: Prisma.$ArchitectureProjectPayload<ExtArgs>
        fields: Prisma.ArchitectureProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArchitectureProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArchitectureProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>
          }
          findFirst: {
            args: Prisma.ArchitectureProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArchitectureProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>
          }
          findMany: {
            args: Prisma.ArchitectureProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>[]
          }
          create: {
            args: Prisma.ArchitectureProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>
          }
          createMany: {
            args: Prisma.ArchitectureProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArchitectureProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>[]
          }
          delete: {
            args: Prisma.ArchitectureProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>
          }
          update: {
            args: Prisma.ArchitectureProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>
          }
          deleteMany: {
            args: Prisma.ArchitectureProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArchitectureProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArchitectureProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>[]
          }
          upsert: {
            args: Prisma.ArchitectureProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArchitectureProjectPayload>
          }
          aggregate: {
            args: Prisma.ArchitectureProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArchitectureProject>
          }
          groupBy: {
            args: Prisma.ArchitectureProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArchitectureProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArchitectureProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ArchitectureProjectCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    architectureProject?: ArchitectureProjectOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ArchitectureProject
   */

  export type AggregateArchitectureProject = {
    _count: ArchitectureProjectCountAggregateOutputType | null
    _min: ArchitectureProjectMinAggregateOutputType | null
    _max: ArchitectureProjectMaxAggregateOutputType | null
  }

  export type ArchitectureProjectMinAggregateOutputType = {
    id: string | null
    userId: string | null
    organizationId: string | null
    title: string | null
    description: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArchitectureProjectMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    organizationId: string | null
    title: string | null
    description: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArchitectureProjectCountAggregateOutputType = {
    id: number
    userId: number
    organizationId: number
    title: number
    description: number
    isPublic: number
    nodes: number
    edges: number
    viewport: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArchitectureProjectMinAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    title?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArchitectureProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    title?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArchitectureProjectCountAggregateInputType = {
    id?: true
    userId?: true
    organizationId?: true
    title?: true
    description?: true
    isPublic?: true
    nodes?: true
    edges?: true
    viewport?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArchitectureProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArchitectureProject to aggregate.
     */
    where?: ArchitectureProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchitectureProjects to fetch.
     */
    orderBy?: ArchitectureProjectOrderByWithRelationInput | ArchitectureProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArchitectureProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchitectureProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchitectureProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArchitectureProjects
    **/
    _count?: true | ArchitectureProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArchitectureProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArchitectureProjectMaxAggregateInputType
  }

  export type GetArchitectureProjectAggregateType<T extends ArchitectureProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateArchitectureProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArchitectureProject[P]>
      : GetScalarType<T[P], AggregateArchitectureProject[P]>
  }




  export type ArchitectureProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArchitectureProjectWhereInput
    orderBy?: ArchitectureProjectOrderByWithAggregationInput | ArchitectureProjectOrderByWithAggregationInput[]
    by: ArchitectureProjectScalarFieldEnum[] | ArchitectureProjectScalarFieldEnum
    having?: ArchitectureProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArchitectureProjectCountAggregateInputType | true
    _min?: ArchitectureProjectMinAggregateInputType
    _max?: ArchitectureProjectMaxAggregateInputType
  }

  export type ArchitectureProjectGroupByOutputType = {
    id: string
    userId: string
    organizationId: string | null
    title: string
    description: string | null
    isPublic: boolean
    nodes: JsonValue
    edges: JsonValue
    viewport: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: ArchitectureProjectCountAggregateOutputType | null
    _min: ArchitectureProjectMinAggregateOutputType | null
    _max: ArchitectureProjectMaxAggregateOutputType | null
  }

  type GetArchitectureProjectGroupByPayload<T extends ArchitectureProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArchitectureProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArchitectureProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArchitectureProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ArchitectureProjectGroupByOutputType[P]>
        }
      >
    >


  export type ArchitectureProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    title?: boolean
    description?: boolean
    isPublic?: boolean
    nodes?: boolean
    edges?: boolean
    viewport?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["architectureProject"]>

  export type ArchitectureProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    title?: boolean
    description?: boolean
    isPublic?: boolean
    nodes?: boolean
    edges?: boolean
    viewport?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["architectureProject"]>

  export type ArchitectureProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    title?: boolean
    description?: boolean
    isPublic?: boolean
    nodes?: boolean
    edges?: boolean
    viewport?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["architectureProject"]>

  export type ArchitectureProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    organizationId?: boolean
    title?: boolean
    description?: boolean
    isPublic?: boolean
    nodes?: boolean
    edges?: boolean
    viewport?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArchitectureProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "organizationId" | "title" | "description" | "isPublic" | "nodes" | "edges" | "viewport" | "createdAt" | "updatedAt", ExtArgs["result"]["architectureProject"]>

  export type $ArchitectureProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArchitectureProject"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      organizationId: string | null
      title: string
      description: string | null
      isPublic: boolean
      nodes: Prisma.JsonValue
      edges: Prisma.JsonValue
      viewport: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["architectureProject"]>
    composites: {}
  }

  type ArchitectureProjectGetPayload<S extends boolean | null | undefined | ArchitectureProjectDefaultArgs> = $Result.GetResult<Prisma.$ArchitectureProjectPayload, S>

  type ArchitectureProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArchitectureProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArchitectureProjectCountAggregateInputType | true
    }

  export interface ArchitectureProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArchitectureProject'], meta: { name: 'ArchitectureProject' } }
    /**
     * Find zero or one ArchitectureProject that matches the filter.
     * @param {ArchitectureProjectFindUniqueArgs} args - Arguments to find a ArchitectureProject
     * @example
     * // Get one ArchitectureProject
     * const architectureProject = await prisma.architectureProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArchitectureProjectFindUniqueArgs>(args: SelectSubset<T, ArchitectureProjectFindUniqueArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArchitectureProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArchitectureProjectFindUniqueOrThrowArgs} args - Arguments to find a ArchitectureProject
     * @example
     * // Get one ArchitectureProject
     * const architectureProject = await prisma.architectureProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArchitectureProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ArchitectureProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArchitectureProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectFindFirstArgs} args - Arguments to find a ArchitectureProject
     * @example
     * // Get one ArchitectureProject
     * const architectureProject = await prisma.architectureProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArchitectureProjectFindFirstArgs>(args?: SelectSubset<T, ArchitectureProjectFindFirstArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArchitectureProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectFindFirstOrThrowArgs} args - Arguments to find a ArchitectureProject
     * @example
     * // Get one ArchitectureProject
     * const architectureProject = await prisma.architectureProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArchitectureProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ArchitectureProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArchitectureProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArchitectureProjects
     * const architectureProjects = await prisma.architectureProject.findMany()
     * 
     * // Get first 10 ArchitectureProjects
     * const architectureProjects = await prisma.architectureProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const architectureProjectWithIdOnly = await prisma.architectureProject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArchitectureProjectFindManyArgs>(args?: SelectSubset<T, ArchitectureProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArchitectureProject.
     * @param {ArchitectureProjectCreateArgs} args - Arguments to create a ArchitectureProject.
     * @example
     * // Create one ArchitectureProject
     * const ArchitectureProject = await prisma.architectureProject.create({
     *   data: {
     *     // ... data to create a ArchitectureProject
     *   }
     * })
     * 
     */
    create<T extends ArchitectureProjectCreateArgs>(args: SelectSubset<T, ArchitectureProjectCreateArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArchitectureProjects.
     * @param {ArchitectureProjectCreateManyArgs} args - Arguments to create many ArchitectureProjects.
     * @example
     * // Create many ArchitectureProjects
     * const architectureProject = await prisma.architectureProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArchitectureProjectCreateManyArgs>(args?: SelectSubset<T, ArchitectureProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArchitectureProjects and returns the data saved in the database.
     * @param {ArchitectureProjectCreateManyAndReturnArgs} args - Arguments to create many ArchitectureProjects.
     * @example
     * // Create many ArchitectureProjects
     * const architectureProject = await prisma.architectureProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArchitectureProjects and only return the `id`
     * const architectureProjectWithIdOnly = await prisma.architectureProject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArchitectureProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ArchitectureProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArchitectureProject.
     * @param {ArchitectureProjectDeleteArgs} args - Arguments to delete one ArchitectureProject.
     * @example
     * // Delete one ArchitectureProject
     * const ArchitectureProject = await prisma.architectureProject.delete({
     *   where: {
     *     // ... filter to delete one ArchitectureProject
     *   }
     * })
     * 
     */
    delete<T extends ArchitectureProjectDeleteArgs>(args: SelectSubset<T, ArchitectureProjectDeleteArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArchitectureProject.
     * @param {ArchitectureProjectUpdateArgs} args - Arguments to update one ArchitectureProject.
     * @example
     * // Update one ArchitectureProject
     * const architectureProject = await prisma.architectureProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArchitectureProjectUpdateArgs>(args: SelectSubset<T, ArchitectureProjectUpdateArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArchitectureProjects.
     * @param {ArchitectureProjectDeleteManyArgs} args - Arguments to filter ArchitectureProjects to delete.
     * @example
     * // Delete a few ArchitectureProjects
     * const { count } = await prisma.architectureProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArchitectureProjectDeleteManyArgs>(args?: SelectSubset<T, ArchitectureProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArchitectureProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArchitectureProjects
     * const architectureProject = await prisma.architectureProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArchitectureProjectUpdateManyArgs>(args: SelectSubset<T, ArchitectureProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArchitectureProjects and returns the data updated in the database.
     * @param {ArchitectureProjectUpdateManyAndReturnArgs} args - Arguments to update many ArchitectureProjects.
     * @example
     * // Update many ArchitectureProjects
     * const architectureProject = await prisma.architectureProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArchitectureProjects and only return the `id`
     * const architectureProjectWithIdOnly = await prisma.architectureProject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArchitectureProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ArchitectureProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArchitectureProject.
     * @param {ArchitectureProjectUpsertArgs} args - Arguments to update or create a ArchitectureProject.
     * @example
     * // Update or create a ArchitectureProject
     * const architectureProject = await prisma.architectureProject.upsert({
     *   create: {
     *     // ... data to create a ArchitectureProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArchitectureProject we want to update
     *   }
     * })
     */
    upsert<T extends ArchitectureProjectUpsertArgs>(args: SelectSubset<T, ArchitectureProjectUpsertArgs<ExtArgs>>): Prisma__ArchitectureProjectClient<$Result.GetResult<Prisma.$ArchitectureProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArchitectureProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectCountArgs} args - Arguments to filter ArchitectureProjects to count.
     * @example
     * // Count the number of ArchitectureProjects
     * const count = await prisma.architectureProject.count({
     *   where: {
     *     // ... the filter for the ArchitectureProjects we want to count
     *   }
     * })
    **/
    count<T extends ArchitectureProjectCountArgs>(
      args?: Subset<T, ArchitectureProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArchitectureProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArchitectureProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArchitectureProjectAggregateArgs>(args: Subset<T, ArchitectureProjectAggregateArgs>): Prisma.PrismaPromise<GetArchitectureProjectAggregateType<T>>

    /**
     * Group by ArchitectureProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchitectureProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArchitectureProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArchitectureProjectGroupByArgs['orderBy'] }
        : { orderBy?: ArchitectureProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArchitectureProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArchitectureProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArchitectureProject model
   */
  readonly fields: ArchitectureProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArchitectureProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArchitectureProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArchitectureProject model
   */
  interface ArchitectureProjectFieldRefs {
    readonly id: FieldRef<"ArchitectureProject", 'String'>
    readonly userId: FieldRef<"ArchitectureProject", 'String'>
    readonly organizationId: FieldRef<"ArchitectureProject", 'String'>
    readonly title: FieldRef<"ArchitectureProject", 'String'>
    readonly description: FieldRef<"ArchitectureProject", 'String'>
    readonly isPublic: FieldRef<"ArchitectureProject", 'Boolean'>
    readonly nodes: FieldRef<"ArchitectureProject", 'Json'>
    readonly edges: FieldRef<"ArchitectureProject", 'Json'>
    readonly viewport: FieldRef<"ArchitectureProject", 'Json'>
    readonly createdAt: FieldRef<"ArchitectureProject", 'DateTime'>
    readonly updatedAt: FieldRef<"ArchitectureProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArchitectureProject findUnique
   */
  export type ArchitectureProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * Filter, which ArchitectureProject to fetch.
     */
    where: ArchitectureProjectWhereUniqueInput
  }

  /**
   * ArchitectureProject findUniqueOrThrow
   */
  export type ArchitectureProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * Filter, which ArchitectureProject to fetch.
     */
    where: ArchitectureProjectWhereUniqueInput
  }

  /**
   * ArchitectureProject findFirst
   */
  export type ArchitectureProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * Filter, which ArchitectureProject to fetch.
     */
    where?: ArchitectureProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchitectureProjects to fetch.
     */
    orderBy?: ArchitectureProjectOrderByWithRelationInput | ArchitectureProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArchitectureProjects.
     */
    cursor?: ArchitectureProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchitectureProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchitectureProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArchitectureProjects.
     */
    distinct?: ArchitectureProjectScalarFieldEnum | ArchitectureProjectScalarFieldEnum[]
  }

  /**
   * ArchitectureProject findFirstOrThrow
   */
  export type ArchitectureProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * Filter, which ArchitectureProject to fetch.
     */
    where?: ArchitectureProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchitectureProjects to fetch.
     */
    orderBy?: ArchitectureProjectOrderByWithRelationInput | ArchitectureProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArchitectureProjects.
     */
    cursor?: ArchitectureProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchitectureProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchitectureProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArchitectureProjects.
     */
    distinct?: ArchitectureProjectScalarFieldEnum | ArchitectureProjectScalarFieldEnum[]
  }

  /**
   * ArchitectureProject findMany
   */
  export type ArchitectureProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * Filter, which ArchitectureProjects to fetch.
     */
    where?: ArchitectureProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArchitectureProjects to fetch.
     */
    orderBy?: ArchitectureProjectOrderByWithRelationInput | ArchitectureProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArchitectureProjects.
     */
    cursor?: ArchitectureProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArchitectureProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArchitectureProjects.
     */
    skip?: number
    distinct?: ArchitectureProjectScalarFieldEnum | ArchitectureProjectScalarFieldEnum[]
  }

  /**
   * ArchitectureProject create
   */
  export type ArchitectureProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a ArchitectureProject.
     */
    data: XOR<ArchitectureProjectCreateInput, ArchitectureProjectUncheckedCreateInput>
  }

  /**
   * ArchitectureProject createMany
   */
  export type ArchitectureProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArchitectureProjects.
     */
    data: ArchitectureProjectCreateManyInput | ArchitectureProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArchitectureProject createManyAndReturn
   */
  export type ArchitectureProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * The data used to create many ArchitectureProjects.
     */
    data: ArchitectureProjectCreateManyInput | ArchitectureProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArchitectureProject update
   */
  export type ArchitectureProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a ArchitectureProject.
     */
    data: XOR<ArchitectureProjectUpdateInput, ArchitectureProjectUncheckedUpdateInput>
    /**
     * Choose, which ArchitectureProject to update.
     */
    where: ArchitectureProjectWhereUniqueInput
  }

  /**
   * ArchitectureProject updateMany
   */
  export type ArchitectureProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArchitectureProjects.
     */
    data: XOR<ArchitectureProjectUpdateManyMutationInput, ArchitectureProjectUncheckedUpdateManyInput>
    /**
     * Filter which ArchitectureProjects to update
     */
    where?: ArchitectureProjectWhereInput
    /**
     * Limit how many ArchitectureProjects to update.
     */
    limit?: number
  }

  /**
   * ArchitectureProject updateManyAndReturn
   */
  export type ArchitectureProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * The data used to update ArchitectureProjects.
     */
    data: XOR<ArchitectureProjectUpdateManyMutationInput, ArchitectureProjectUncheckedUpdateManyInput>
    /**
     * Filter which ArchitectureProjects to update
     */
    where?: ArchitectureProjectWhereInput
    /**
     * Limit how many ArchitectureProjects to update.
     */
    limit?: number
  }

  /**
   * ArchitectureProject upsert
   */
  export type ArchitectureProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the ArchitectureProject to update in case it exists.
     */
    where: ArchitectureProjectWhereUniqueInput
    /**
     * In case the ArchitectureProject found by the `where` argument doesn't exist, create a new ArchitectureProject with this data.
     */
    create: XOR<ArchitectureProjectCreateInput, ArchitectureProjectUncheckedCreateInput>
    /**
     * In case the ArchitectureProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArchitectureProjectUpdateInput, ArchitectureProjectUncheckedUpdateInput>
  }

  /**
   * ArchitectureProject delete
   */
  export type ArchitectureProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
    /**
     * Filter which ArchitectureProject to delete.
     */
    where: ArchitectureProjectWhereUniqueInput
  }

  /**
   * ArchitectureProject deleteMany
   */
  export type ArchitectureProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArchitectureProjects to delete
     */
    where?: ArchitectureProjectWhereInput
    /**
     * Limit how many ArchitectureProjects to delete.
     */
    limit?: number
  }

  /**
   * ArchitectureProject without action
   */
  export type ArchitectureProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArchitectureProject
     */
    select?: ArchitectureProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArchitectureProject
     */
    omit?: ArchitectureProjectOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ArchitectureProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    organizationId: 'organizationId',
    title: 'title',
    description: 'description',
    isPublic: 'isPublic',
    nodes: 'nodes',
    edges: 'edges',
    viewport: 'viewport',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArchitectureProjectScalarFieldEnum = (typeof ArchitectureProjectScalarFieldEnum)[keyof typeof ArchitectureProjectScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ArchitectureProjectWhereInput = {
    AND?: ArchitectureProjectWhereInput | ArchitectureProjectWhereInput[]
    OR?: ArchitectureProjectWhereInput[]
    NOT?: ArchitectureProjectWhereInput | ArchitectureProjectWhereInput[]
    id?: UuidFilter<"ArchitectureProject"> | string
    userId?: UuidFilter<"ArchitectureProject"> | string
    organizationId?: UuidNullableFilter<"ArchitectureProject"> | string | null
    title?: StringFilter<"ArchitectureProject"> | string
    description?: StringNullableFilter<"ArchitectureProject"> | string | null
    isPublic?: BoolFilter<"ArchitectureProject"> | boolean
    nodes?: JsonFilter<"ArchitectureProject">
    edges?: JsonFilter<"ArchitectureProject">
    viewport?: JsonFilter<"ArchitectureProject">
    createdAt?: DateTimeFilter<"ArchitectureProject"> | Date | string
    updatedAt?: DateTimeFilter<"ArchitectureProject"> | Date | string
  }

  export type ArchitectureProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    nodes?: SortOrder
    edges?: SortOrder
    viewport?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArchitectureProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArchitectureProjectWhereInput | ArchitectureProjectWhereInput[]
    OR?: ArchitectureProjectWhereInput[]
    NOT?: ArchitectureProjectWhereInput | ArchitectureProjectWhereInput[]
    userId?: UuidFilter<"ArchitectureProject"> | string
    organizationId?: UuidNullableFilter<"ArchitectureProject"> | string | null
    title?: StringFilter<"ArchitectureProject"> | string
    description?: StringNullableFilter<"ArchitectureProject"> | string | null
    isPublic?: BoolFilter<"ArchitectureProject"> | boolean
    nodes?: JsonFilter<"ArchitectureProject">
    edges?: JsonFilter<"ArchitectureProject">
    viewport?: JsonFilter<"ArchitectureProject">
    createdAt?: DateTimeFilter<"ArchitectureProject"> | Date | string
    updatedAt?: DateTimeFilter<"ArchitectureProject"> | Date | string
  }, "id">

  export type ArchitectureProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    nodes?: SortOrder
    edges?: SortOrder
    viewport?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArchitectureProjectCountOrderByAggregateInput
    _max?: ArchitectureProjectMaxOrderByAggregateInput
    _min?: ArchitectureProjectMinOrderByAggregateInput
  }

  export type ArchitectureProjectScalarWhereWithAggregatesInput = {
    AND?: ArchitectureProjectScalarWhereWithAggregatesInput | ArchitectureProjectScalarWhereWithAggregatesInput[]
    OR?: ArchitectureProjectScalarWhereWithAggregatesInput[]
    NOT?: ArchitectureProjectScalarWhereWithAggregatesInput | ArchitectureProjectScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ArchitectureProject"> | string
    userId?: UuidWithAggregatesFilter<"ArchitectureProject"> | string
    organizationId?: UuidNullableWithAggregatesFilter<"ArchitectureProject"> | string | null
    title?: StringWithAggregatesFilter<"ArchitectureProject"> | string
    description?: StringNullableWithAggregatesFilter<"ArchitectureProject"> | string | null
    isPublic?: BoolWithAggregatesFilter<"ArchitectureProject"> | boolean
    nodes?: JsonWithAggregatesFilter<"ArchitectureProject">
    edges?: JsonWithAggregatesFilter<"ArchitectureProject">
    viewport?: JsonWithAggregatesFilter<"ArchitectureProject">
    createdAt?: DateTimeWithAggregatesFilter<"ArchitectureProject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ArchitectureProject"> | Date | string
  }

  export type ArchitectureProjectCreateInput = {
    id?: string
    userId: string
    organizationId?: string | null
    title: string
    description?: string | null
    isPublic?: boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArchitectureProjectUncheckedCreateInput = {
    id?: string
    userId: string
    organizationId?: string | null
    title: string
    description?: string | null
    isPublic?: boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArchitectureProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArchitectureProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArchitectureProjectCreateManyInput = {
    id?: string
    userId: string
    organizationId?: string | null
    title: string
    description?: string | null
    isPublic?: boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArchitectureProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArchitectureProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    nodes?: JsonNullValueInput | InputJsonValue
    edges?: JsonNullValueInput | InputJsonValue
    viewport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArchitectureProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    nodes?: SortOrder
    edges?: SortOrder
    viewport?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArchitectureProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArchitectureProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}