import Sequelize, { Model } from "sequelize";

class Review extends Model {
    static init(sequelize) {
        super.init(
            {
                stars: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                message: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                villa_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'villas',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            },
            {
                sequelize,
                timestamps: true, // If you want createdAt and updatedAt columns
                underscored: true, // For snake_case columns
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.Villa, { foreignKey: 'villa_id' });
    }
}

export default Review;
