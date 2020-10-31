import { getConnection } from 'typeorm';

export async function clearDatabase() {
  const conn = getConnection();
  const entities = conn.entityMetadatas;

  entities.forEach(async (entity: any) => {
    const repository = conn.getRepository(entity.name);
    await repository.query(`DELETE FROM "${entity.tableName}";`);
  });
}
