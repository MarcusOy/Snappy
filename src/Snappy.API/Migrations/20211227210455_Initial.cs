using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Snappy.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Salt = table.Column<string>(type: "TEXT", nullable: false),
                    PublicKey = table.Column<string>(type: "TEXT", nullable: true),
                    TwoFactorKey = table.Column<string>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuthTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Token = table.Column<string>(type: "TEXT", nullable: false),
                    ExpiresOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    RevokedOn = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ReplacedByTokenId = table.Column<Guid>(type: "TEXT", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuthTokens_AuthTokens_ReplacedByTokenId",
                        column: x => x.ReplacedByTokenId,
                        principalTable: "AuthTokens",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AuthTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MessageKey = table.Column<string>(type: "TEXT", nullable: false),
                    MessagePayload = table.Column<string>(type: "TEXT", nullable: false),
                    SenderCopyKey = table.Column<string>(type: "TEXT", nullable: false),
                    SenderCopyPayload = table.Column<string>(type: "TEXT", nullable: false),
                    SenderId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ReceiverId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Active", "CreatedOn", "DeletedOn", "FirstName", "LastName", "Password", "PublicKey", "Salt", "TwoFactorKey", "UpdatedOn", "Username" },
                values: new object[] { new Guid("3e1be469-2608-454d-8f86-7fa0e6242929"), true, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Patrick", "Mansour", "5gPhSOtYNknJrdkL8CkXR+n4X1Cw8r8Eryut84Ugyn4=", "key", "yMQxyBY/bNL1STLI/6VTQA==", "2DWYCISPHOCQHELY7VU25NE4VPDS5SQP", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "patrick" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Active", "CreatedOn", "DeletedOn", "FirstName", "LastName", "Password", "PublicKey", "Salt", "TwoFactorKey", "UpdatedOn", "Username" },
                values: new object[] { new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), true, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Marcus", "Orciuch", "LHy2L5PJ3CQKfPJInHesZDF3A46DzJ9kcIAdKh4LJps=", "key", "sllNIW/h0hpFVYUCSANGIQ==", "7NNMK5OAHEAWQRVNVH6LUNZEWUUEZZGZ", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "marcus" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Active", "CreatedOn", "DeletedOn", "FirstName", "LastName", "Password", "PublicKey", "Salt", "TwoFactorKey", "UpdatedOn", "Username" },
                values: new object[] { new Guid("ad194377-d21e-46ec-a142-80a8e4236cf7"), true, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Kyle", "Orciuch", "c1bCSyyfCBrncjHd21bR4yDB/t4gKTd+1Vxs76+bdOs=", "key", "JWYpy9YEzRpqVLYl6oVesw==", "KC4OJ4AX6UGDRV7UISSWQ3GLCSTYHKIX", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "kyle" });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedOn", "DeletedOn", "MessageKey", "MessagePayload", "ReceiverId", "SenderCopyKey", "SenderCopyPayload", "SenderId", "UpdatedOn" },
                values: new object[] { new Guid("19dabd46-f88e-4dbf-a692-59985487c8d5"), new DateTime(2021, 12, 27, 21, 7, 55, 304, DateTimeKind.Utc).AddTicks(5310), null, "messageKey", "I am doing great! Hbu?", new Guid("3e1be469-2608-454d-8f86-7fa0e6242929"), "senderKey", "I am doing great! Hbu?", new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedOn", "DeletedOn", "MessageKey", "MessagePayload", "ReceiverId", "SenderCopyKey", "SenderCopyPayload", "SenderId", "UpdatedOn" },
                values: new object[] { new Guid("514a087c-2c5c-4273-852d-b9647cff6c88"), new DateTime(2021, 12, 27, 21, 5, 55, 304, DateTimeKind.Utc).AddTicks(5300), null, "messageKey", "I am doing great! Hbu?", new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), "senderKey", "I am doing great! Hbu?", new Guid("ad194377-d21e-46ec-a142-80a8e4236cf7"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedOn", "DeletedOn", "MessageKey", "MessagePayload", "ReceiverId", "SenderCopyKey", "SenderCopyPayload", "SenderId", "UpdatedOn" },
                values: new object[] { new Guid("9f020a88-1a0c-497e-93b0-49f49e1c55c2"), new DateTime(2021, 12, 27, 21, 9, 55, 304, DateTimeKind.Utc).AddTicks(5320), null, "messageKey", "Great as well!", new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), "senderKey", "Great as well!", new Guid("3e1be469-2608-454d-8f86-7fa0e6242929"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedOn", "DeletedOn", "MessageKey", "MessagePayload", "ReceiverId", "SenderCopyKey", "SenderCopyPayload", "SenderId", "UpdatedOn" },
                values: new object[] { new Guid("a68cd8b3-de5c-4687-b775-e4bffbd4d5a8"), new DateTime(2021, 12, 27, 21, 5, 55, 304, DateTimeKind.Utc).AddTicks(5310), null, "messageKey", "Hi marcus, how are you doing?", new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), "senderKey", "Hi kyle, how are you doing?", new Guid("3e1be469-2608-454d-8f86-7fa0e6242929"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedOn", "DeletedOn", "MessageKey", "MessagePayload", "ReceiverId", "SenderCopyKey", "SenderCopyPayload", "SenderId", "UpdatedOn" },
                values: new object[] { new Guid("e4462d86-bf11-4ae6-b586-c5ad928664bc"), new DateTime(2021, 12, 27, 21, 6, 55, 304, DateTimeKind.Utc).AddTicks(5310), null, "messageKey", "Great as well!", new Guid("ad194377-d21e-46ec-a142-80a8e4236cf7"), "senderKey", "Great as well!", new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedOn", "DeletedOn", "MessageKey", "MessagePayload", "ReceiverId", "SenderCopyKey", "SenderCopyPayload", "SenderId", "UpdatedOn" },
                values: new object[] { new Guid("f6c755f3-51e7-48dd-9b3a-c173b618bab4"), new DateTime(2021, 12, 27, 21, 4, 55, 304, DateTimeKind.Utc).AddTicks(5290), null, "messageKey", "Hi kyle, how are you doing?", new Guid("ad194377-d21e-46ec-a142-80a8e4236cf7"), "senderKey", "Hi kyle, how are you doing?", new Guid("4f169ea5-e573-4507-a62a-b74e61b8352c"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.CreateIndex(
                name: "IX_AuthTokens_ReplacedByTokenId",
                table: "AuthTokens",
                column: "ReplacedByTokenId");

            migrationBuilder.CreateIndex(
                name: "IX_AuthTokens_UserId",
                table: "AuthTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceiverId",
                table: "Messages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthTokens");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
