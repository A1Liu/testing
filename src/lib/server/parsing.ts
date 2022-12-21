import { z } from 'zod';

export async function parseFormData<T extends z.ZodRawShape>(request: Request, schema: T) {
  const data = await request.formData();

  const record: Record<string, unknown> = {};
  for (const key in schema) {
    record[key] = data.get(key);
  }

  return z.object(schema).parse(record);
}
