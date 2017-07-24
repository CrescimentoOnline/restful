export default (sequelize, DataType) => {
  const UserProfile = sequelize.define('UserProfile', {
    firstName: {
      type: DataType.STRING(255),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataType.STRING(255),
      allowNull: false,
      field: 'last_name'
    },
    age: {
      type: DataType.INTEGER()
    },
    bloodType: {
      type: DataType.STRING(3),
      field: 'blood_type'
    },
    gender: {
      type: DataType.STRING(2)
    },
    birthDate: {
      type: DataType.DATE(),
      field: 'birth_date'
    },
    address: {
      type: DataType.STRING(255)
    },
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    avatarFileId: {
      type: DataType.INTEGER,
      references: {
        model: 'files',
        key: 'id'
      },
      field: 'avatar_file_id'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'user_profiles',

    classMethods: {
      associate: (models) => {
        UserProfile.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        UserProfile.belongsTo(models.File, {
          foreignKey: 'avatarFileId'
        });
      }
    },

    scopes: {
      user: (id) => {
        return {
          where: {
            userId: id
          }
        };
      }
    }
  });

  return UserProfile;
};
