"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("villas", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            about: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            facilities: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            room_rates: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            is_rented: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            rent_start: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            rent_end: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            gallery: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            booking_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "bookings",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            baths: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            beds: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            max_guest: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            summary: {
                type: Sequelize.STRING(150),
                allowNull: false,
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
        await queryInterface.dropTable("villas");
    },
};
