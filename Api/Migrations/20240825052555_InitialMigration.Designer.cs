﻿// <auto-generated />
using ChecklistApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ChecklistApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240825052555_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.7");

            modelBuilder.Entity("ChecklistApi.Entities.Checklist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Checklists");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = "2024-04-01 11:00:00+13:00",
                            Description = "Checklist tracking what needs to be done first thing in the kitchen.",
                            Name = "Start of day - kitchen"
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = "2024-04-01 11:40:00+13:00",
                            Description = "Closing process for end of day.",
                            Name = "End of day - kitchen"
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = "2024-06-11 08:00:00+12:00",
                            Description = "Lists of tasks to be completed around midday, these can be done by anyone.",
                            Name = "Midday check in"
                        });
                });

            modelBuilder.Entity("ChecklistApi.Entities.ChecklistItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ChecklistId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ChecklistId");

                    b.ToTable("ChecklistItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ChecklistId = 1,
                            Description = "Get the bins ready for use during the day, they'll be on the street after being emptied.",
                            Title = "Bring in bins"
                        },
                        new
                        {
                            Id = 2,
                            ChecklistId = 1,
                            Description = "Check all fridge temps and record them in the checklist.",
                            Title = "Check fridge temps"
                        },
                        new
                        {
                            Id = 3,
                            ChecklistId = 1,
                            Description = "Get the fryer warmed up.",
                            Title = "Turn on fryer"
                        },
                        new
                        {
                            Id = 4,
                            ChecklistId = 1,
                            Description = "Get the coffee machine warmed up.",
                            Title = "Turn on coffee machine"
                        },
                        new
                        {
                            Id = 5,
                            ChecklistId = 2,
                            Description = "Make sure the coffee machine is clean and turned off overnight.",
                            Title = "Turn off coffee machine and clean"
                        },
                        new
                        {
                            Id = 6,
                            ChecklistId = 2,
                            Description = "Make sure the fryer is clean and turned off overnight.",
                            Title = "Turn off fryer and clean"
                        },
                        new
                        {
                            Id = 7,
                            ChecklistId = 2,
                            Description = "Check all fridge temps and record them in the checklist.",
                            Title = "Check fridge temps"
                        },
                        new
                        {
                            Id = 8,
                            ChecklistId = 2,
                            Description = "Last thing before you leave, put the bins out on the street.",
                            Title = "Put bins out"
                        },
                        new
                        {
                            Id = 9,
                            ChecklistId = 3,
                            Description = "Check all fridge temps and record them in the checklist.",
                            Title = "Check fridge temps"
                        },
                        new
                        {
                            Id = 10,
                            ChecklistId = 3,
                            Description = "Update the FOH team on today's specials so they can get them on the chalkboard.",
                            Title = "Let FOH know the specials"
                        });
                });

            modelBuilder.Entity("ChecklistApi.Entities.TeamMember", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TeamMembers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "ava@example.com",
                            FirstName = "Ava",
                            LastName = "Cado"
                        },
                        new
                        {
                            Id = 2,
                            Email = "cara@example.com",
                            FirstName = "Cara",
                            LastName = "Mello"
                        },
                        new
                        {
                            Id = 3,
                            Email = "pete@example.com",
                            FirstName = "Pete",
                            LastName = "Zah"
                        });
                });

            modelBuilder.Entity("ChecklistApi.Entities.ChecklistItem", b =>
                {
                    b.HasOne("ChecklistApi.Entities.Checklist", null)
                        .WithMany("Items")
                        .HasForeignKey("ChecklistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ChecklistApi.Entities.Checklist", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
