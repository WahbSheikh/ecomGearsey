import { MongoClient } from "mongodb";
declare const client: MongoClient;
declare const db: import("mongodb").Db;
export declare const auth: {
    handler: (request: Request) => Promise<Response>;
    api: import("better-auth").InferAPI<{
        ok: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    ok: boolean;
                };
            } : {
                ok: boolean;
            }>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/ok";
        };
        error: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Response;
            } : Response>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/error";
        };
        signInSocial: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: unknown;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                    idToken?: {
                        token: string;
                        nonce?: string | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                    } | undefined;
                    scopes?: string[] | undefined;
                    requestSignUp?: boolean | undefined;
                    loginHint?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    url: string;
                    redirect: boolean;
                };
            } : {
                redirect: boolean;
                token: string;
                url: undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    newUserCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodType<"apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "github" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown, import("better-auth").$ZodTypeInternals<"apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "github" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown>>;
                    disableRedirect: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    idToken: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        token: import("better-auth").ZodString;
                        nonce: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        accessToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        refreshToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        expiresAt: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                    }, import("better-auth").$strip>>;
                    scopes: import("better-auth").ZodOptional<import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    requestSignUp: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    loginHint: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        operationId: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                    url: {
                                                        type: string;
                                                        nullable: boolean;
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            image: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/social";
        };
        callbackOAuth: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: {
                    code?: string | undefined;
                    error?: string | undefined;
                    device_id?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                    user?: string | undefined;
                } | undefined;
            } & {
                method: "GET" | "POST";
            } & {
                query?: {
                    code?: string | undefined;
                    error?: string | undefined;
                    device_id?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                    user?: string | undefined;
                } | undefined;
            } & {
                params: {
                    id: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void;
            } : void>;
            options: {
                method: ("GET" | "POST")[];
                body: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    device_id: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    user: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>>;
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    device_id: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    user: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>>;
                metadata: {
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/callback/:id";
        };
        getSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    disableCookieCache?: unknown;
                    disableRefresh?: unknown;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined | undefined;
                        userAgent?: string | null | undefined | undefined;
                        impersonatedBy?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined | undefined;
                        banned: boolean | null | undefined;
                        role?: string | null | undefined;
                        banReason?: string | null | undefined;
                        banExpires?: Date | null | undefined;
                        address: string;
                        phone: string;
                        rating: number | null | undefined;
                        total_reviews: number | null | undefined;
                    };
                } | null;
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                    impersonatedBy?: string | null | undefined;
                };
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined | undefined;
                    banned: boolean | null | undefined;
                    role?: string | null | undefined;
                    banReason?: string | null | undefined;
                    banExpires?: Date | null | undefined;
                    address: string;
                    phone: string;
                    rating: number | null | undefined;
                    total_reviews: number | null | undefined;
                };
            } | null>;
            options: {
                method: "GET";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    disableCookieCache: import("better-auth").ZodOptional<import("better-auth").ZodCoercedBoolean<unknown>>;
                    disableRefresh: import("better-auth").ZodOptional<import("better-auth").ZodCoercedBoolean<unknown>>;
                }, import("better-auth").$strip>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-session";
        };
        signOut: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-out";
        };
        signUpEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
                } & {} & {} & {
                    address: string;
                    phone: string;
                } & {
                    address?: string | null | undefined;
                    phone?: string | null | undefined;
                    rating?: number | null | undefined;
                    total_reviews?: number | null | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & {} & {} & {
                            address: string;
                            phone: string;
                        } & {
                            address?: string | null | undefined;
                            phone?: string | null | undefined;
                            rating?: number | null | undefined;
                            total_reviews?: number | null | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-up/email";
        };
        signInEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    password: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                redirect: boolean;
                token: string;
                url: string | undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodDefault<import("better-auth").ZodBoolean>>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                };
                                                url: {
                                                    type: string;
                                                    nullable: boolean;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        image: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/email";
        };
        forgetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    redirectTo: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/forget-password";
        };
        resetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: {
                    token?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>>;
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password";
        };
        verifyEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void | {
                    status: boolean;
                    user: {
                        id: any;
                        email: any;
                        name: any;
                        image: any;
                        emailVerified: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                } | {
                    status: boolean;
                    user: null;
                };
            } : void | {
                status: boolean;
                user: {
                    id: any;
                    email: any;
                    name: any;
                    image: any;
                    emailVerified: any;
                    createdAt: any;
                    updatedAt: any;
                };
            } | {
                status: boolean;
                user: null;
            }>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        parameters: ({
                            name: string;
                            in: "query";
                            description: string;
                            required: true;
                            schema: {
                                type: "string";
                            };
                        } | {
                            name: string;
                            in: "query";
                            description: string;
                            required: false;
                            schema: {
                                type: "string";
                            };
                        })[];
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/verify-email";
        };
        sendVerificationEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodEmail;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                                example: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                                example: string;
                                                nullable: boolean;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                    example: boolean;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            "400": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    example: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/send-verification-email";
        };
        changeEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newEmail: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newEmail: import("better-auth").ZodEmail;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                    nullable: boolean;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-email";
        };
        changePassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: string | null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: string | null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    currentPassword: import("better-auth").ZodString;
                    revokeOtherSessions: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-password";
        };
        setPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/set-password";
        };
        updateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: Partial<import("better-auth").AdditionalUserFieldsInput<{
                    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").Adapter;
                    appName: string;
                    secret: string;
                    baseURL: string;
                    trustedOrigins: string[];
                    plugins: [{
                        id: "admin";
                        init(): {
                            options: {
                                databaseHooks: {
                                    user: {
                                        create: {
                                            before(user: {
                                                id: string;
                                                createdAt: Date;
                                                updatedAt: Date;
                                                email: string;
                                                emailVerified: boolean;
                                                name: string;
                                                image?: string | null | undefined;
                                            } & Record<string, unknown>): Promise<{
                                                data: {
                                                    id: string;
                                                    createdAt: Date;
                                                    updatedAt: Date;
                                                    email: string;
                                                    emailVerified: boolean;
                                                    name: string;
                                                    image?: string | null | undefined;
                                                    role: string;
                                                };
                                            }>;
                                        };
                                    };
                                    session: {
                                        create: {
                                            before(session: {
                                                id: string;
                                                createdAt: Date;
                                                updatedAt: Date;
                                                userId: string;
                                                expiresAt: Date;
                                                token: string;
                                                ipAddress?: string | null | undefined;
                                                userAgent?: string | null | undefined;
                                            } & Record<string, unknown>, ctx: import("better-auth").GenericEndpointContext | undefined): Promise<void>;
                                        };
                                    };
                                };
                            };
                        };
                        hooks: {
                            after: {
                                matcher(context: import("better-auth").HookEndpointContext): boolean;
                                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>;
                            }[];
                        };
                        endpoints: {
                            setRole: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_1 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: string;
                                        role: "admin" | "user" | ("admin" | "user")[];
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_1 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_1] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        user: import("better-auth/plugins").UserWithRole;
                                    };
                                } : {
                                    user: import("better-auth/plugins").UserWithRole;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                        role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                                    }, import("better-auth").$strip>;
                                    requireHeaders: true;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        $Infer: {
                                            body: {
                                                userId: string;
                                                role: "admin" | "user" | ("admin" | "user")[];
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/set-role";
                            };
                            getUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_2 extends boolean = false>(inputCtx_0: {
                                    body?: undefined;
                                } & {
                                    method?: "GET" | undefined;
                                } & {
                                    query: {
                                        id: string;
                                    };
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_2 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_2] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        id: string;
                                        createdAt: Date;
                                        updatedAt: Date;
                                        email: string;
                                        emailVerified: boolean;
                                        name: string;
                                        image?: string | null | undefined;
                                    };
                                } : {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                }>;
                                options: {
                                    method: "GET";
                                    query: import("better-auth").ZodObject<{
                                        id: import("better-auth").ZodString;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/get-user";
                            };
                            createUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_3 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        email: string;
                                        password: string;
                                        name: string;
                                        role?: "admin" | "user" | ("admin" | "user")[];
                                        data?: Record<string, any>;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_3 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_3] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        user: import("better-auth/plugins").UserWithRole;
                                    };
                                } : {
                                    user: import("better-auth/plugins").UserWithRole;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        email: import("better-auth").ZodString;
                                        password: import("better-auth").ZodString;
                                        name: import("better-auth").ZodString;
                                        role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                                        data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                                    }, import("better-auth").$strip>;
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        $Infer: {
                                            body: {
                                                email: string;
                                                password: string;
                                                name: string;
                                                role?: "admin" | "user" | ("admin" | "user")[];
                                                data?: Record<string, any>;
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/create-user";
                            };
                            adminUpdateUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_4 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                        data: Record<any, any>;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_4 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_4] extends [true] ? {
                                    headers: Headers;
                                    response: import("better-auth/plugins").UserWithRole;
                                } : import("better-auth/plugins").UserWithRole>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                        data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/update-user";
                            };
                            listUsers: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_5 extends boolean = false>(inputCtx_0: {
                                    body?: undefined;
                                } & {
                                    method?: "GET" | undefined;
                                } & {
                                    query: {
                                        searchValue?: string | undefined;
                                        searchField?: "name" | "email" | undefined;
                                        searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                                        limit?: string | number | undefined;
                                        offset?: string | number | undefined;
                                        sortBy?: string | undefined;
                                        sortDirection?: "asc" | "desc" | undefined;
                                        filterField?: string | undefined;
                                        filterValue?: string | number | boolean | undefined;
                                        filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                                    };
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_5 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_5] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        users: import("better-auth/plugins").UserWithRole[];
                                        total: number;
                                        limit: number | undefined;
                                        offset: number | undefined;
                                    } | {
                                        users: never[];
                                        total: number;
                                    };
                                } : {
                                    users: import("better-auth/plugins").UserWithRole[];
                                    total: number;
                                    limit: number | undefined;
                                    offset: number | undefined;
                                } | {
                                    users: never[];
                                    total: number;
                                }>;
                                options: {
                                    method: "GET";
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    query: import("better-auth").ZodObject<{
                                        searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                        searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                            name: "name";
                                            email: "email";
                                        }>>;
                                        searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                            contains: "contains";
                                            starts_with: "starts_with";
                                            ends_with: "ends_with";
                                        }>>;
                                        limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                                        offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                                        sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                        sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                            asc: "asc";
                                            desc: "desc";
                                        }>>;
                                        filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                        filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                                        filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                            eq: "eq";
                                            ne: "ne";
                                            lt: "lt";
                                            lte: "lte";
                                            gt: "gt";
                                            gte: "gte";
                                            contains: "contains";
                                        }>>;
                                    }, import("better-auth").$strip>;
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    users: {
                                                                        type: string;
                                                                        items: {
                                                                            $ref: string;
                                                                        };
                                                                    };
                                                                    total: {
                                                                        type: string;
                                                                    };
                                                                    limit: {
                                                                        type: string;
                                                                    };
                                                                    offset: {
                                                                        type: string;
                                                                    };
                                                                };
                                                                required: string[];
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/list-users";
                            };
                            listUserSessions: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_6 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_6 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_6] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                                    };
                                } : {
                                    sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                                }>;
                                options: {
                                    method: "POST";
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                    }, import("better-auth").$strip>;
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    sessions: {
                                                                        type: string;
                                                                        items: {
                                                                            $ref: string;
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/list-user-sessions";
                            };
                            unbanUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_7 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_7 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_7] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        user: any;
                                    };
                                } : {
                                    user: any;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/unban-user";
                            };
                            banUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_8 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                        banReason?: string | undefined;
                                        banExpiresIn?: number | undefined;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_8 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_8] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        user: any;
                                    };
                                } : {
                                    user: any;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                        banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                        banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/ban-user";
                            };
                            impersonateUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_9 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_9 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_9] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        session: {
                                            id: string;
                                            createdAt: Date;
                                            updatedAt: Date;
                                            userId: string;
                                            expiresAt: Date;
                                            token: string;
                                            ipAddress?: string | null | undefined;
                                            userAgent?: string | null | undefined;
                                        };
                                        user: {
                                            id: string;
                                            createdAt: Date;
                                            updatedAt: Date;
                                            email: string;
                                            emailVerified: boolean;
                                            name: string;
                                            image?: string | null | undefined;
                                        };
                                    };
                                } : {
                                    session: {
                                        id: string;
                                        createdAt: Date;
                                        updatedAt: Date;
                                        userId: string;
                                        expiresAt: Date;
                                        token: string;
                                        ipAddress?: string | null | undefined;
                                        userAgent?: string | null | undefined;
                                    };
                                    user: {
                                        id: string;
                                        createdAt: Date;
                                        updatedAt: Date;
                                        email: string;
                                        emailVerified: boolean;
                                        name: string;
                                        image?: string | null | undefined;
                                    };
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    session: {
                                                                        $ref: string;
                                                                    };
                                                                    user: {
                                                                        $ref: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/impersonate-user";
                            };
                            stopImpersonating: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_10 extends boolean = false>(inputCtx_0: {
                                    body?: undefined;
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_10 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_10] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        session: import("better-auth").Session & Record<string, any>;
                                        user: import("better-auth").User & Record<string, any>;
                                    };
                                } : {
                                    session: import("better-auth").Session & Record<string, any>;
                                    user: import("better-auth").User & Record<string, any>;
                                }>;
                                options: {
                                    method: "POST";
                                    requireHeaders: true;
                                } & {
                                    use: any[];
                                };
                                path: "/admin/stop-impersonating";
                            };
                            revokeUserSession: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_11 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        sessionToken: string;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_11 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_11] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        success: boolean;
                                    };
                                } : {
                                    success: boolean;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        sessionToken: import("better-auth").ZodString;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    success: {
                                                                        type: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/revoke-user-session";
                            };
                            revokeUserSessions: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_12 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_12 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_12] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        success: boolean;
                                    };
                                } : {
                                    success: boolean;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    success: {
                                                                        type: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/revoke-user-sessions";
                            };
                            removeUser: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_13 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        userId: unknown;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_13 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_13] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        success: boolean;
                                    };
                                } : {
                                    success: boolean;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    success: {
                                                                        type: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/remove-user";
                            };
                            setUserPassword: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_14 extends boolean = false>(inputCtx_0: {
                                    body: {
                                        newPassword: string;
                                        userId: unknown;
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_14 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_14] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        status: boolean;
                                    };
                                } : {
                                    status: boolean;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodObject<{
                                        newPassword: import("better-auth").ZodString;
                                        userId: import("better-auth").ZodCoercedString<unknown>;
                                    }, import("better-auth").$strip>;
                                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                        session: {
                                            user: import("better-auth/plugins").UserWithRole;
                                            session: import("better-auth").Session;
                                        };
                                    }>)[];
                                    metadata: {
                                        openapi: {
                                            operationId: string;
                                            summary: string;
                                            description: string;
                                            responses: {
                                                200: {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    status: {
                                                                        type: string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/set-user-password";
                            };
                            userHasPermission: {
                                <AsResponse_1 extends boolean = false, ReturnHeaders_15 extends boolean = false>(inputCtx_0: {
                                    body: ({
                                        permission: {
                                            readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                            readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                        };
                                        permissions?: never;
                                    } | {
                                        permissions: {
                                            readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                            readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                        };
                                        permission?: never;
                                    }) & {
                                        userId?: string;
                                        role?: "admin" | "user";
                                    };
                                } & {
                                    method?: "POST" | undefined;
                                } & {
                                    query?: Record<string, any> | undefined;
                                } & {
                                    params?: Record<string, any>;
                                } & {
                                    request?: Request;
                                } & {
                                    headers?: HeadersInit;
                                } & {
                                    asResponse?: boolean;
                                    returnHeaders?: boolean;
                                    use?: import("better-auth").Middleware[];
                                    path?: string;
                                } & {
                                    asResponse?: AsResponse_1 | undefined;
                                    returnHeaders?: ReturnHeaders_15 | undefined;
                                }): Promise<[AsResponse_1] extends [true] ? Response : [ReturnHeaders_15] extends [true] ? {
                                    headers: Headers;
                                    response: {
                                        error: null;
                                        success: boolean;
                                    };
                                } : {
                                    error: null;
                                    success: boolean;
                                }>;
                                options: {
                                    method: "POST";
                                    body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                                        userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                                        role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                    }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                                        permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                                        permissions: import("better-auth").ZodUndefined;
                                    }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                                        permission: import("better-auth").ZodUndefined;
                                        permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                                    }, import("better-auth").$strip>]>>;
                                    metadata: {
                                        openapi: {
                                            description: string;
                                            requestBody: {
                                                content: {
                                                    "application/json": {
                                                        schema: {
                                                            type: "object";
                                                            properties: {
                                                                permission: {
                                                                    type: string;
                                                                    description: string;
                                                                    deprecated: boolean;
                                                                };
                                                                permissions: {
                                                                    type: string;
                                                                    description: string;
                                                                };
                                                            };
                                                            required: string[];
                                                        };
                                                    };
                                                };
                                            };
                                            responses: {
                                                "200": {
                                                    description: string;
                                                    content: {
                                                        "application/json": {
                                                            schema: {
                                                                type: "object";
                                                                properties: {
                                                                    error: {
                                                                        type: string;
                                                                    };
                                                                    success: {
                                                                        type: string;
                                                                    };
                                                                };
                                                                required: string[];
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        $Infer: {
                                            body: ({
                                                permission: {
                                                    readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                                    readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                                };
                                                permissions?: never;
                                            } | {
                                                permissions: {
                                                    readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                                    readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                                };
                                                permission?: never;
                                            }) & {
                                                userId?: string;
                                                role?: "admin" | "user";
                                            };
                                        };
                                    };
                                } & {
                                    use: any[];
                                };
                                path: "/admin/has-permission";
                            };
                        };
                        $ERROR_CODES: {
                            readonly FAILED_TO_CREATE_USER: "Failed to create user";
                            readonly USER_ALREADY_EXISTS: "User already exists. Use another email.";
                            readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
                            readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
                            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
                            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
                            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
                            readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
                            readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
                            readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
                            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
                            readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
                            readonly BANNED_USER: "You have been banned from this application";
                            readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
                            readonly NO_DATA_TO_UPDATE: "No data to update";
                            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
                            readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
                        };
                        schema: {
                            user: {
                                fields: {
                                    role: {
                                        type: "string";
                                        required: false;
                                        input: false;
                                    };
                                    banned: {
                                        type: "boolean";
                                        defaultValue: false;
                                        required: false;
                                        input: false;
                                    };
                                    banReason: {
                                        type: "string";
                                        required: false;
                                        input: false;
                                    };
                                    banExpires: {
                                        type: "date";
                                        required: false;
                                        input: false;
                                    };
                                };
                            };
                            session: {
                                fields: {
                                    impersonatedBy: {
                                        type: "string";
                                        required: false;
                                    };
                                };
                            };
                        };
                        options: any;
                    }];
                    user: {
                        additionalFields: {
                            address: {
                                type: "string";
                                required: true;
                                input: true;
                            };
                            phone: {
                                type: "string";
                                required: true;
                                input: true;
                            };
                            rating: {
                                type: "number";
                                required: false;
                                defaultValue: number;
                            };
                            total_reviews: {
                                type: "number";
                                required: false;
                                defaultValue: number;
                            };
                        };
                    };
                    emailAndPassword: {
                        enabled: true;
                        autoSignIn: true;
                        minPasswordLength: number;
                    };
                    advanced: {
                        crossSubDomainCookies: {
                            enabled: false;
                        };
                    };
                }>> & {
                    name?: string;
                    image?: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<import("better-auth").AdditionalUserFieldsInput<{
                            database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").Adapter;
                            appName: string;
                            secret: string;
                            baseURL: string;
                            trustedOrigins: string[];
                            plugins: [{
                                id: "admin";
                                init(): {
                                    options: {
                                        databaseHooks: {
                                            user: {
                                                create: {
                                                    before(user: {
                                                        id: string;
                                                        createdAt: Date;
                                                        updatedAt: Date;
                                                        email: string;
                                                        emailVerified: boolean;
                                                        name: string;
                                                        image?: string | null | undefined;
                                                    } & Record<string, unknown>): Promise<{
                                                        data: {
                                                            id: string;
                                                            createdAt: Date;
                                                            updatedAt: Date;
                                                            email: string;
                                                            emailVerified: boolean;
                                                            name: string;
                                                            image?: string | null | undefined;
                                                            role: string;
                                                        };
                                                    }>;
                                                };
                                            };
                                            session: {
                                                create: {
                                                    before(session: {
                                                        id: string;
                                                        createdAt: Date;
                                                        updatedAt: Date;
                                                        userId: string;
                                                        expiresAt: Date;
                                                        token: string;
                                                        ipAddress?: string | null | undefined;
                                                        userAgent?: string | null | undefined;
                                                    } & Record<string, unknown>, ctx: import("better-auth").GenericEndpointContext | undefined): Promise<void>;
                                                };
                                            };
                                        };
                                    };
                                };
                                hooks: {
                                    after: {
                                        matcher(context: import("better-auth").HookEndpointContext): boolean;
                                        handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>;
                                    }[];
                                };
                                endpoints: {
                                    setRole: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: string;
                                                role: "admin" | "user" | ("admin" | "user")[];
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                user: import("better-auth/plugins").UserWithRole;
                                            };
                                        } : {
                                            user: import("better-auth/plugins").UserWithRole;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                                role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                                            }, import("better-auth").$strip>;
                                            requireHeaders: true;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                $Infer: {
                                                    body: {
                                                        userId: string;
                                                        role: "admin" | "user" | ("admin" | "user")[];
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/set-role";
                                    };
                                    getUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body?: undefined;
                                        } & {
                                            method?: "GET" | undefined;
                                        } & {
                                            query: {
                                                id: string;
                                            };
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                id: string;
                                                createdAt: Date;
                                                updatedAt: Date;
                                                email: string;
                                                emailVerified: boolean;
                                                name: string;
                                                image?: string | null | undefined;
                                            };
                                        } : {
                                            id: string;
                                            createdAt: Date;
                                            updatedAt: Date;
                                            email: string;
                                            emailVerified: boolean;
                                            name: string;
                                            image?: string | null | undefined;
                                        }>;
                                        options: {
                                            method: "GET";
                                            query: import("better-auth").ZodObject<{
                                                id: import("better-auth").ZodString;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/get-user";
                                    };
                                    createUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                email: string;
                                                password: string;
                                                name: string;
                                                role?: "admin" | "user" | ("admin" | "user")[];
                                                data?: Record<string, any>;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                user: import("better-auth/plugins").UserWithRole;
                                            };
                                        } : {
                                            user: import("better-auth/plugins").UserWithRole;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                email: import("better-auth").ZodString;
                                                password: import("better-auth").ZodString;
                                                name: import("better-auth").ZodString;
                                                role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                                                data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                                            }, import("better-auth").$strip>;
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                $Infer: {
                                                    body: {
                                                        email: string;
                                                        password: string;
                                                        name: string;
                                                        role?: "admin" | "user" | ("admin" | "user")[];
                                                        data?: Record<string, any>;
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/create-user";
                                    };
                                    adminUpdateUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                                data: Record<any, any>;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: import("better-auth/plugins").UserWithRole;
                                        } : import("better-auth/plugins").UserWithRole>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                                data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/update-user";
                                    };
                                    listUsers: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body?: undefined;
                                        } & {
                                            method?: "GET" | undefined;
                                        } & {
                                            query: {
                                                searchValue?: string | undefined;
                                                searchField?: "name" | "email" | undefined;
                                                searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                                                limit?: string | number | undefined;
                                                offset?: string | number | undefined;
                                                sortBy?: string | undefined;
                                                sortDirection?: "asc" | "desc" | undefined;
                                                filterField?: string | undefined;
                                                filterValue?: string | number | boolean | undefined;
                                                filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                                            };
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                users: import("better-auth/plugins").UserWithRole[];
                                                total: number;
                                                limit: number | undefined;
                                                offset: number | undefined;
                                            } | {
                                                users: never[];
                                                total: number;
                                            };
                                        } : {
                                            users: import("better-auth/plugins").UserWithRole[];
                                            total: number;
                                            limit: number | undefined;
                                            offset: number | undefined;
                                        } | {
                                            users: never[];
                                            total: number;
                                        }>;
                                        options: {
                                            method: "GET";
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            query: import("better-auth").ZodObject<{
                                                searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                                searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                                    name: "name";
                                                    email: "email";
                                                }>>;
                                                searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                                    contains: "contains";
                                                    starts_with: "starts_with";
                                                    ends_with: "ends_with";
                                                }>>;
                                                limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                                                offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                                                sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                                sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                                    asc: "asc";
                                                    desc: "desc";
                                                }>>;
                                                filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                                filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                                                filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                                    eq: "eq";
                                                    ne: "ne";
                                                    lt: "lt";
                                                    lte: "lte";
                                                    gt: "gt";
                                                    gte: "gte";
                                                    contains: "contains";
                                                }>>;
                                            }, import("better-auth").$strip>;
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            users: {
                                                                                type: string;
                                                                                items: {
                                                                                    $ref: string;
                                                                                };
                                                                            };
                                                                            total: {
                                                                                type: string;
                                                                            };
                                                                            limit: {
                                                                                type: string;
                                                                            };
                                                                            offset: {
                                                                                type: string;
                                                                            };
                                                                        };
                                                                        required: string[];
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/list-users";
                                    };
                                    listUserSessions: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                                            };
                                        } : {
                                            sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                                        }>;
                                        options: {
                                            method: "POST";
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                            }, import("better-auth").$strip>;
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            sessions: {
                                                                                type: string;
                                                                                items: {
                                                                                    $ref: string;
                                                                                };
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/list-user-sessions";
                                    };
                                    unbanUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                user: any;
                                            };
                                        } : {
                                            user: any;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/unban-user";
                                    };
                                    banUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                                banReason?: string | undefined;
                                                banExpiresIn?: number | undefined;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                user: any;
                                            };
                                        } : {
                                            user: any;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                                banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                                banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/ban-user";
                                    };
                                    impersonateUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                session: {
                                                    id: string;
                                                    createdAt: Date;
                                                    updatedAt: Date;
                                                    userId: string;
                                                    expiresAt: Date;
                                                    token: string;
                                                    ipAddress?: string | null | undefined;
                                                    userAgent?: string | null | undefined;
                                                };
                                                user: {
                                                    id: string;
                                                    createdAt: Date;
                                                    updatedAt: Date;
                                                    email: string;
                                                    emailVerified: boolean;
                                                    name: string;
                                                    image?: string | null | undefined;
                                                };
                                            };
                                        } : {
                                            session: {
                                                id: string;
                                                createdAt: Date;
                                                updatedAt: Date;
                                                userId: string;
                                                expiresAt: Date;
                                                token: string;
                                                ipAddress?: string | null | undefined;
                                                userAgent?: string | null | undefined;
                                            };
                                            user: {
                                                id: string;
                                                createdAt: Date;
                                                updatedAt: Date;
                                                email: string;
                                                emailVerified: boolean;
                                                name: string;
                                                image?: string | null | undefined;
                                            };
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            session: {
                                                                                $ref: string;
                                                                            };
                                                                            user: {
                                                                                $ref: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/impersonate-user";
                                    };
                                    stopImpersonating: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body?: undefined;
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                session: import("better-auth").Session & Record<string, any>;
                                                user: import("better-auth").User & Record<string, any>;
                                            };
                                        } : {
                                            session: import("better-auth").Session & Record<string, any>;
                                            user: import("better-auth").User & Record<string, any>;
                                        }>;
                                        options: {
                                            method: "POST";
                                            requireHeaders: true;
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/stop-impersonating";
                                    };
                                    revokeUserSession: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                sessionToken: string;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                success: boolean;
                                            };
                                        } : {
                                            success: boolean;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                sessionToken: import("better-auth").ZodString;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            success: {
                                                                                type: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/revoke-user-session";
                                    };
                                    revokeUserSessions: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                success: boolean;
                                            };
                                        } : {
                                            success: boolean;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            success: {
                                                                                type: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/revoke-user-sessions";
                                    };
                                    removeUser: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                userId: unknown;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                success: boolean;
                                            };
                                        } : {
                                            success: boolean;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            success: {
                                                                                type: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/remove-user";
                                    };
                                    setUserPassword: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: {
                                                newPassword: string;
                                                userId: unknown;
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                status: boolean;
                                            };
                                        } : {
                                            status: boolean;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodObject<{
                                                newPassword: import("better-auth").ZodString;
                                                userId: import("better-auth").ZodCoercedString<unknown>;
                                            }, import("better-auth").$strip>;
                                            use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                                                session: {
                                                    user: import("better-auth/plugins").UserWithRole;
                                                    session: import("better-auth").Session;
                                                };
                                            }>)[];
                                            metadata: {
                                                openapi: {
                                                    operationId: string;
                                                    summary: string;
                                                    description: string;
                                                    responses: {
                                                        200: {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            status: {
                                                                                type: string;
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/set-user-password";
                                    };
                                    userHasPermission: {
                                        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                                            body: ({
                                                permission: {
                                                    readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                                    readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                                };
                                                permissions?: never;
                                            } | {
                                                permissions: {
                                                    readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                                    readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                                };
                                                permission?: never;
                                            }) & {
                                                userId?: string;
                                                role?: "admin" | "user";
                                            };
                                        } & {
                                            method?: "POST" | undefined;
                                        } & {
                                            query?: Record<string, any> | undefined;
                                        } & {
                                            params?: Record<string, any>;
                                        } & {
                                            request?: Request;
                                        } & {
                                            headers?: HeadersInit;
                                        } & {
                                            asResponse?: boolean;
                                            returnHeaders?: boolean;
                                            use?: import("better-auth").Middleware[];
                                            path?: string;
                                        } & {
                                            asResponse?: AsResponse | undefined;
                                            returnHeaders?: ReturnHeaders | undefined;
                                        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                                            headers: Headers;
                                            response: {
                                                error: null;
                                                success: boolean;
                                            };
                                        } : {
                                            error: null;
                                            success: boolean;
                                        }>;
                                        options: {
                                            method: "POST";
                                            body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                                                userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                                                role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                                            }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                                                permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                                                permissions: import("better-auth").ZodUndefined;
                                            }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                                                permission: import("better-auth").ZodUndefined;
                                                permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                                            }, import("better-auth").$strip>]>>;
                                            metadata: {
                                                openapi: {
                                                    description: string;
                                                    requestBody: {
                                                        content: {
                                                            "application/json": {
                                                                schema: {
                                                                    type: "object";
                                                                    properties: {
                                                                        permission: {
                                                                            type: string;
                                                                            description: string;
                                                                            deprecated: boolean;
                                                                        };
                                                                        permissions: {
                                                                            type: string;
                                                                            description: string;
                                                                        };
                                                                    };
                                                                    required: string[];
                                                                };
                                                            };
                                                        };
                                                    };
                                                    responses: {
                                                        "200": {
                                                            description: string;
                                                            content: {
                                                                "application/json": {
                                                                    schema: {
                                                                        type: "object";
                                                                        properties: {
                                                                            error: {
                                                                                type: string;
                                                                            };
                                                                            success: {
                                                                                type: string;
                                                                            };
                                                                        };
                                                                        required: string[];
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                $Infer: {
                                                    body: ({
                                                        permission: {
                                                            readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                                            readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                                        };
                                                        permissions?: never;
                                                    } | {
                                                        permissions: {
                                                            readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                                            readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                                        };
                                                        permission?: never;
                                                    }) & {
                                                        userId?: string;
                                                        role?: "admin" | "user";
                                                    };
                                                };
                                            };
                                        } & {
                                            use: any[];
                                        };
                                        path: "/admin/has-permission";
                                    };
                                };
                                $ERROR_CODES: {
                                    readonly FAILED_TO_CREATE_USER: "Failed to create user";
                                    readonly USER_ALREADY_EXISTS: "User already exists. Use another email.";
                                    readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
                                    readonly BANNED_USER: "You have been banned from this application";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
                                    readonly NO_DATA_TO_UPDATE: "No data to update";
                                    readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
                                    readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
                                };
                                schema: {
                                    user: {
                                        fields: {
                                            role: {
                                                type: "string";
                                                required: false;
                                                input: false;
                                            };
                                            banned: {
                                                type: "boolean";
                                                defaultValue: false;
                                                required: false;
                                                input: false;
                                            };
                                            banReason: {
                                                type: "string";
                                                required: false;
                                                input: false;
                                            };
                                            banExpires: {
                                                type: "date";
                                                required: false;
                                                input: false;
                                            };
                                        };
                                    };
                                    session: {
                                        fields: {
                                            impersonatedBy: {
                                                type: "string";
                                                required: false;
                                            };
                                        };
                                    };
                                };
                                options: any;
                            }];
                            user: {
                                additionalFields: {
                                    address: {
                                        type: "string";
                                        required: true;
                                        input: true;
                                    };
                                    phone: {
                                        type: "string";
                                        required: true;
                                        input: true;
                                    };
                                    rating: {
                                        type: "number";
                                        required: false;
                                        defaultValue: number;
                                    };
                                    total_reviews: {
                                        type: "number";
                                        required: false;
                                        defaultValue: number;
                                    };
                                };
                            };
                            emailAndPassword: {
                                enabled: true;
                                autoSignIn: true;
                                minPasswordLength: number;
                            };
                            advanced: {
                                crossSubDomainCookies: {
                                    enabled: false;
                                };
                            };
                        }>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/update-user";
        };
        deleteUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    callbackURL?: string | undefined;
                    password?: string | undefined;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    password: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user";
        };
        forgetPasswordCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        requestPasswordReset: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodEmail;
                    redirectTo: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/request-password-reset";
        };
        requestPasswordResetCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        listSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: import("better-auth").Prettify<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                    impersonatedBy?: string | null | undefined;
                }>[];
            } : import("better-auth").Prettify<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
                impersonatedBy?: string | null | undefined;
            }>[]>;
            options: {
                method: "GET";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-sessions";
        };
        revokeSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    token: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-session";
        };
        revokeSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-sessions";
        };
        revokeOtherSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-other-sessions";
        };
        linkSocialAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: unknown;
                    callbackURL?: string | undefined;
                    idToken?: {
                        token: string;
                        nonce?: string | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        scopes?: string[] | undefined;
                    } | undefined;
                    requestSignUp?: boolean | undefined;
                    scopes?: string[] | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodType<"apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "github" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown, import("better-auth").$ZodTypeInternals<"apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "github" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown>>;
                    idToken: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        token: import("better-auth").ZodString;
                        nonce: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        accessToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        refreshToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        scopes: import("better-auth").ZodOptional<import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    }, import("better-auth").$strip>>;
                    requestSignUp: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    scopes: import("better-auth").ZodOptional<import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    disableRedirect: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                    description: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                    description: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/link-social";
        };
        listUserAccounts: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    providerId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    accountId: string;
                    scopes: string[];
                }[];
            } : {
                id: string;
                providerId: string;
                createdAt: Date;
                updatedAt: Date;
                accountId: string;
                scopes: string[];
            }[]>;
            options: {
                method: "GET";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    providerId: {
                                                        type: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    accountId: {
                                                        type: string;
                                                    };
                                                    scopes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-accounts";
        };
        deleteUserCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user/callback";
        };
        unlinkAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    providerId: import("better-auth").ZodString;
                    accountId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/unlink-account";
        };
        refreshToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: import("better-auth").OAuth2Tokens;
            } : import("better-auth").OAuth2Tokens>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    providerId: import("better-auth").ZodString;
                    accountId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    userId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/refresh-token";
        };
        getAccessToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    accessToken: string;
                    accessTokenExpiresAt: Date | undefined;
                    scopes: string[];
                    idToken: string | undefined;
                };
            } : {
                accessToken: string;
                accessTokenExpiresAt: Date | undefined;
                scopes: string[];
                idToken: string | undefined;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    providerId: import("better-auth").ZodString;
                    accountId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    userId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-access-token";
        };
        accountInfo: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    accountId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: import("better-auth").OAuth2UserInfo;
                    data: Record<string, any>;
                } | null;
            } : {
                user: import("better-auth").OAuth2UserInfo;
                data: Record<string, any>;
            } | null>;
            options: {
                method: "POST";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                data: {
                                                    type: string;
                                                    properties: {};
                                                    additionalProperties: boolean;
                                                };
                                            };
                                            required: string[];
                                            additionalProperties: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                body: import("better-auth").ZodObject<{
                    accountId: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
            } & {
                use: any[];
            };
            path: "/account-info";
        };
    } & {
        setRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: string;
                    role: "admin" | "user" | ("admin" | "user")[];
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: import("better-auth/plugins").UserWithRole;
                };
            } : {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                    role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                }, import("better-auth").$strip>;
                requireHeaders: true;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            userId: string;
                            role: "admin" | "user" | ("admin" | "user")[];
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/set-role";
        };
        getUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    id: string;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            } : {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
            }>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    id: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/get-user";
        };
        createUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    password: string;
                    name: string;
                    role?: "admin" | "user" | ("admin" | "user")[];
                    data?: Record<string, any>;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: import("better-auth/plugins").UserWithRole;
                };
            } : {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    name: import("better-auth").ZodString;
                    role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                    data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            email: string;
                            password: string;
                            name: string;
                            role?: "admin" | "user" | ("admin" | "user")[];
                            data?: Record<string, any>;
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/create-user";
        };
        adminUpdateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                    data: Record<any, any>;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: import("better-auth/plugins").UserWithRole;
            } : import("better-auth/plugins").UserWithRole>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                    data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/update-user";
        };
        listUsers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    searchValue?: string | undefined;
                    searchField?: "name" | "email" | undefined;
                    searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    users: import("better-auth/plugins").UserWithRole[];
                    total: number;
                    limit: number | undefined;
                    offset: number | undefined;
                } | {
                    users: never[];
                    total: number;
                };
            } : {
                users: import("better-auth/plugins").UserWithRole[];
                total: number;
                limit: number | undefined;
                offset: number | undefined;
            } | {
                users: never[];
                total: number;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                query: import("better-auth").ZodObject<{
                    searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        name: "name";
                        email: "email";
                    }>>;
                    searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        contains: "contains";
                        starts_with: "starts_with";
                        ends_with: "ends_with";
                    }>>;
                    limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                    offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                    sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                    filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                users: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                                total: {
                                                    type: string;
                                                };
                                                limit: {
                                                    type: string;
                                                };
                                                offset: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/list-users";
        };
        listUserSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                };
            } : {
                sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
            }>;
            options: {
                method: "POST";
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("better-auth").$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                sessions: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/list-user-sessions";
        };
        unbanUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: any;
                };
            } : {
                user: any;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/unban-user";
        };
        banUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                    banReason?: string | undefined;
                    banExpiresIn?: number | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: any;
                };
            } : {
                user: any;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                    banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/ban-user";
        };
        impersonateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/impersonate-user";
        };
        stopImpersonating: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: import("better-auth").Session & Record<string, any>;
                    user: import("better-auth").User & Record<string, any>;
                };
            } : {
                session: import("better-auth").Session & Record<string, any>;
                user: import("better-auth").User & Record<string, any>;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
            } & {
                use: any[];
            };
            path: "/admin/stop-impersonating";
        };
        revokeUserSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    sessionToken: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    sessionToken: import("better-auth").ZodString;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/revoke-user-session";
        };
        revokeUserSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/revoke-user-sessions";
        };
        removeUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/remove-user";
        };
        setUserPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    userId: import("better-auth").ZodCoercedString<unknown>;
                }, import("better-auth").$strip>;
                use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/set-user-password";
        };
        userHasPermission: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: ({
                    permission: {
                        readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                        readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                    };
                    permissions?: never;
                } | {
                    permissions: {
                        readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                        readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                    };
                    permission?: never;
                }) & {
                    userId?: string;
                    role?: "admin" | "user";
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: import("better-auth").Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    error: null;
                    success: boolean;
                };
            } : {
                error: null;
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                    role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                    permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    permissions: import("better-auth").ZodUndefined;
                }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                    permission: import("better-auth").ZodUndefined;
                    permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                }, import("better-auth").$strip>]>>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            permission: {
                                                type: string;
                                                description: string;
                                                deprecated: boolean;
                                            };
                                            permissions: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                error: {
                                                    type: string;
                                                };
                                                success: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: ({
                            permission: {
                                readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                            };
                            permissions?: never;
                        } | {
                            permissions: {
                                readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                            };
                            permission?: never;
                        }) & {
                            userId?: string;
                            role?: "admin" | "user";
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/has-permission";
        };
    }>;
    options: {
        database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").Adapter;
        appName: string;
        secret: string;
        baseURL: string;
        trustedOrigins: string[];
        plugins: [{
            id: "admin";
            init(): {
                options: {
                    databaseHooks: {
                        user: {
                            create: {
                                before(user: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                } & Record<string, unknown>): Promise<{
                                    data: {
                                        id: string;
                                        createdAt: Date;
                                        updatedAt: Date;
                                        email: string;
                                        emailVerified: boolean;
                                        name: string;
                                        image?: string | null | undefined;
                                        role: string;
                                    };
                                }>;
                            };
                        };
                        session: {
                            create: {
                                before(session: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                } & Record<string, unknown>, ctx: import("better-auth").GenericEndpointContext | undefined): Promise<void>;
                            };
                        };
                    };
                };
            };
            hooks: {
                after: {
                    matcher(context: import("better-auth").HookEndpointContext): boolean;
                    handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>;
                }[];
            };
            endpoints: {
                setRole: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: string;
                            role: "admin" | "user" | ("admin" | "user")[];
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            user: import("better-auth/plugins").UserWithRole;
                        };
                    } : {
                        user: import("better-auth/plugins").UserWithRole;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                            role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                        }, import("better-auth").$strip>;
                        requireHeaders: true;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            $Infer: {
                                body: {
                                    userId: string;
                                    role: "admin" | "user" | ("admin" | "user")[];
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/set-role";
                };
                getUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body?: undefined;
                    } & {
                        method?: "GET" | undefined;
                    } & {
                        query: {
                            id: string;
                        };
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } : {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    }>;
                    options: {
                        method: "GET";
                        query: import("better-auth").ZodObject<{
                            id: import("better-auth").ZodString;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/get-user";
                };
                createUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            email: string;
                            password: string;
                            name: string;
                            role?: "admin" | "user" | ("admin" | "user")[];
                            data?: Record<string, any>;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            user: import("better-auth/plugins").UserWithRole;
                        };
                    } : {
                        user: import("better-auth/plugins").UserWithRole;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            email: import("better-auth").ZodString;
                            password: import("better-auth").ZodString;
                            name: import("better-auth").ZodString;
                            role: import("better-auth").ZodOptional<import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>>;
                            data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                        }, import("better-auth").$strip>;
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            $Infer: {
                                body: {
                                    email: string;
                                    password: string;
                                    name: string;
                                    role?: "admin" | "user" | ("admin" | "user")[];
                                    data?: Record<string, any>;
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/create-user";
                };
                adminUpdateUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                            data: Record<any, any>;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: import("better-auth/plugins").UserWithRole;
                    } : import("better-auth/plugins").UserWithRole>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                            data: import("better-auth").ZodRecord<import("better-auth").ZodAny, import("better-auth").ZodAny>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/update-user";
                };
                listUsers: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body?: undefined;
                    } & {
                        method?: "GET" | undefined;
                    } & {
                        query: {
                            searchValue?: string | undefined;
                            searchField?: "name" | "email" | undefined;
                            searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                            limit?: string | number | undefined;
                            offset?: string | number | undefined;
                            sortBy?: string | undefined;
                            sortDirection?: "asc" | "desc" | undefined;
                            filterField?: string | undefined;
                            filterValue?: string | number | boolean | undefined;
                            filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                        };
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            users: import("better-auth/plugins").UserWithRole[];
                            total: number;
                            limit: number | undefined;
                            offset: number | undefined;
                        } | {
                            users: never[];
                            total: number;
                        };
                    } : {
                        users: import("better-auth/plugins").UserWithRole[];
                        total: number;
                        limit: number | undefined;
                        offset: number | undefined;
                    } | {
                        users: never[];
                        total: number;
                    }>;
                    options: {
                        method: "GET";
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        query: import("better-auth").ZodObject<{
                            searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                name: "name";
                                email: "email";
                            }>>;
                            searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                contains: "contains";
                                starts_with: "starts_with";
                                ends_with: "ends_with";
                            }>>;
                            limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                            offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                            sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                asc: "asc";
                                desc: "desc";
                            }>>;
                            filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                            filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                                eq: "eq";
                                ne: "ne";
                                lt: "lt";
                                lte: "lte";
                                gt: "gt";
                                gte: "gte";
                                contains: "contains";
                            }>>;
                        }, import("better-auth").$strip>;
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        users: {
                                                            type: string;
                                                            items: {
                                                                $ref: string;
                                                            };
                                                        };
                                                        total: {
                                                            type: string;
                                                        };
                                                        limit: {
                                                            type: string;
                                                        };
                                                        offset: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/list-users";
                };
                listUserSessions: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                        };
                    } : {
                        sessions: import("better-auth/plugins").SessionWithImpersonatedBy[];
                    }>;
                    options: {
                        method: "POST";
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                        }, import("better-auth").$strip>;
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        sessions: {
                                                            type: string;
                                                            items: {
                                                                $ref: string;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/list-user-sessions";
                };
                unbanUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            user: any;
                        };
                    } : {
                        user: any;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/unban-user";
                };
                banUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                            banReason?: string | undefined;
                            banExpiresIn?: number | undefined;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            user: any;
                        };
                    } : {
                        user: any;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                            banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/ban-user";
                };
                impersonateUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    } : {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        session: {
                                                            $ref: string;
                                                        };
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/impersonate-user";
                };
                stopImpersonating: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body?: undefined;
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            session: import("better-auth").Session & Record<string, any>;
                            user: import("better-auth").User & Record<string, any>;
                        };
                    } : {
                        session: import("better-auth").Session & Record<string, any>;
                        user: import("better-auth").User & Record<string, any>;
                    }>;
                    options: {
                        method: "POST";
                        requireHeaders: true;
                    } & {
                        use: any[];
                    };
                    path: "/admin/stop-impersonating";
                };
                revokeUserSession: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            sessionToken: string;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            success: boolean;
                        };
                    } : {
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            sessionToken: import("better-auth").ZodString;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/revoke-user-session";
                };
                revokeUserSessions: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            success: boolean;
                        };
                    } : {
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/revoke-user-sessions";
                };
                removeUser: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            userId: unknown;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            success: boolean;
                        };
                    } : {
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodCoercedString<unknown>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/remove-user";
                };
                setUserPassword: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            newPassword: string;
                            userId: unknown;
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            status: boolean;
                        };
                    } : {
                        status: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            newPassword: import("better-auth").ZodString;
                            userId: import("better-auth").ZodCoercedString<unknown>;
                        }, import("better-auth").$strip>;
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        status: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/set-user-password";
                };
                userHasPermission: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: ({
                            permission: {
                                readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                            };
                            permissions?: never;
                        } | {
                            permissions: {
                                readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                            };
                            permission?: never;
                        }) & {
                            userId?: string;
                            role?: "admin" | "user";
                        };
                    } & {
                        method?: "POST" | undefined;
                    } & {
                        query?: Record<string, any> | undefined;
                    } & {
                        params?: Record<string, any>;
                    } & {
                        request?: Request;
                    } & {
                        headers?: HeadersInit;
                    } & {
                        asResponse?: boolean;
                        returnHeaders?: boolean;
                        use?: import("better-auth").Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            error: null;
                            success: boolean;
                        };
                    } : {
                        error: null;
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                            role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                            permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                            permissions: import("better-auth").ZodUndefined;
                        }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                            permission: import("better-auth").ZodUndefined;
                            permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                        }, import("better-auth").$strip>]>>;
                        metadata: {
                            openapi: {
                                description: string;
                                requestBody: {
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    permission: {
                                                        type: string;
                                                        description: string;
                                                        deprecated: boolean;
                                                    };
                                                    permissions: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                                responses: {
                                    "200": {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        error: {
                                                            type: string;
                                                        };
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            $Infer: {
                                body: ({
                                    permission: {
                                        readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                        readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                    };
                                    permissions?: never;
                                } | {
                                    permissions: {
                                        readonly user?: ("get" | "delete" | "list" | "update" | "create" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                        readonly session?: ("delete" | "revoke" | "list")[] | undefined;
                                    };
                                    permission?: never;
                                }) & {
                                    userId?: string;
                                    role?: "admin" | "user";
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/has-permission";
                };
            };
            $ERROR_CODES: {
                readonly FAILED_TO_CREATE_USER: "Failed to create user";
                readonly USER_ALREADY_EXISTS: "User already exists. Use another email.";
                readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
                readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
                readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
                readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
                readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
                readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
                readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
                readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
                readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
                readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
                readonly BANNED_USER: "You have been banned from this application";
                readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
                readonly NO_DATA_TO_UPDATE: "No data to update";
                readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
                readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
            };
            schema: {
                user: {
                    fields: {
                        role: {
                            type: "string";
                            required: false;
                            input: false;
                        };
                        banned: {
                            type: "boolean";
                            defaultValue: false;
                            required: false;
                            input: false;
                        };
                        banReason: {
                            type: "string";
                            required: false;
                            input: false;
                        };
                        banExpires: {
                            type: "date";
                            required: false;
                            input: false;
                        };
                    };
                };
                session: {
                    fields: {
                        impersonatedBy: {
                            type: "string";
                            required: false;
                        };
                    };
                };
            };
            options: any;
        }];
        user: {
            additionalFields: {
                address: {
                    type: "string";
                    required: true;
                    input: true;
                };
                phone: {
                    type: "string";
                    required: true;
                    input: true;
                };
                rating: {
                    type: "number";
                    required: false;
                    defaultValue: number;
                };
                total_reviews: {
                    type: "number";
                    required: false;
                    defaultValue: number;
                };
            };
        };
        emailAndPassword: {
            enabled: true;
            autoSignIn: true;
            minPasswordLength: number;
        };
        advanced: {
            crossSubDomainCookies: {
                enabled: false;
            };
        };
    };
    $context: Promise<import("better-auth").AuthContext>;
    $Infer: {
        Session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
                impersonatedBy?: string | null | undefined;
            };
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
                banned: boolean | null | undefined;
                role?: string | null | undefined;
                banReason?: string | null | undefined;
                banExpires?: Date | null | undefined;
                address: string;
                phone: string;
                rating: number | null | undefined;
                total_reviews: number | null | undefined;
            };
        };
    };
    $ERROR_CODES: {
        readonly FAILED_TO_CREATE_USER: "Failed to create user";
        readonly USER_ALREADY_EXISTS: "User already exists. Use another email.";
        readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
        readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
        readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
        readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
        readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
        readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
        readonly BANNED_USER: "You have been banned from this application";
        readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
        readonly NO_DATA_TO_UPDATE: "No data to update";
        readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
        readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
    } & {
        USER_NOT_FOUND: string;
        FAILED_TO_CREATE_USER: string;
        FAILED_TO_CREATE_SESSION: string;
        FAILED_TO_UPDATE_USER: string;
        FAILED_TO_GET_SESSION: string;
        INVALID_PASSWORD: string;
        INVALID_EMAIL: string;
        INVALID_EMAIL_OR_PASSWORD: string;
        SOCIAL_ACCOUNT_ALREADY_LINKED: string;
        PROVIDER_NOT_FOUND: string;
        INVALID_TOKEN: string;
        ID_TOKEN_NOT_SUPPORTED: string;
        FAILED_TO_GET_USER_INFO: string;
        USER_EMAIL_NOT_FOUND: string;
        EMAIL_NOT_VERIFIED: string;
        PASSWORD_TOO_SHORT: string;
        PASSWORD_TOO_LONG: string;
        USER_ALREADY_EXISTS: string;
        EMAIL_CAN_NOT_BE_UPDATED: string;
        CREDENTIAL_ACCOUNT_NOT_FOUND: string;
        SESSION_EXPIRED: string;
        FAILED_TO_UNLINK_LAST_ACCOUNT: string;
        ACCOUNT_NOT_FOUND: string;
        USER_ALREADY_HAS_PASSWORD: string;
    };
};
export { db, client };
//# sourceMappingURL=auth.d.ts.map