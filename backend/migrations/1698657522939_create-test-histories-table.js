/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('test_histories', {
    id: 'id',
    user_id: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    mode: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    total_questions: {
      type: 'integer',
      notNull: true,
    },
    completed: {
      type: 'boolean',
      notNull: true,
    },
    feedback: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('test_histories');
};
