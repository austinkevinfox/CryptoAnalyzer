import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    price: z.number().gte(1).lte(100),
});

export default schema;
