import Sequelize, { Model } from 'sequelize';

class CancellationRequest extends Model {
    static init(sequelize) {
        super.init(
            {
                booking_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'bookings', // table name of your Booking model
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                reason: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                status: {
                    type: Sequelize.ENUM,
                    values: ['pending', 'approved', 'denied'],
                    defaultValue: 'pending',
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'cancellation_requests',
                timestamps: true,
                underscored: true,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Booking, { foreignKey: 'booking_id', as: 'Booking' });
    }
}

export default CancellationRequest;
