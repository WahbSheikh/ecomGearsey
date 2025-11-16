import { auth } from "@/lib/auth.js";
export async function createUser(email, password, name, role, address, phone) {
    await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            role,
            address,
            phone,
            rating: 0,
            total_reviews: 0,
        },
    });
    console.log("User created:", email);
}
//# sourceMappingURL=user.js.map