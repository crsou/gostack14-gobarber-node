import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1604696639635
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid', // postgres only, else -> varchar
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            // isNullable: false, // is false by default
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // postgres only, else -> timestamp
            // isNullable: false, // is false by default
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

// só é possível alterar migrations enquanto não é enviada para git

/*
Migration:

linha do tempo

1º semana: agendamentos
2º semana: usuários
(novo dev) 3º semana: edição em agendamentos
4º semana: compras (não reflete alterações do novo deve)

migrations: essencialmente github pra banco (versionamento e etc)

*/
