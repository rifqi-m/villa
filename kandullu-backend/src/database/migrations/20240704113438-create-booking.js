"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("bookings", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            property_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            payment_id: {
              type: Sequelize.STRING,
              allowNull: true,
              unique: true
          },
            payment_type: {
                type: Sequelize.ENUM("half_payment", "full_payment"),
                allowNull: false,
            },
            amount: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            pending_amount: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE"
            },
            guests: {
              type: Sequelize.JSON,
              allowNull: false,
            },
            is_paid: {
              type: Sequelize.BOOLEAN,
              defaultValue: false
            },
            is_paid_partially: {
              type: Sequelize.BOOLEAN,
              defaultValue: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("bookings");
    },
};
