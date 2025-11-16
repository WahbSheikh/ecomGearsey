import { Model, model, Schema } from "mongoose";
const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true });
export const Category = model("Category", categorySchema);
//# sourceMappingURL=category.js.map