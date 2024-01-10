import { Request, Response, Router } from "express";
import { prisma } from "../utils/db.server";

export const admin = Router();

// POST /admin : add more role admin to user
admin.post("/", async (req: any, res: any) => {
  try {
    try {
      const { id, firstName, lastName } = req.query;
      let admin;
      if (id) {
        admin = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            isAdmin: true,
          },
        });
      } else {
        admin = await prisma.user.create({
          data: {
            firstName,
            lastName,
          },
        });
      }

      return res.send({ ok: true, admin });
    } catch (err) {
      return res.status(400).send({
        ok: false,
        id: req.query.id,
        message: "Record to add admin role not found",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ ok: false, message: "Internal Server Error" });
  }
});

// DELETE /admin : remove role admin from user
admin.delete("/", async (req: any, res: any) => {
  try {
    try {
      const user = await prisma.user.update({
        where: {
          id: req.query.id,
        },
        data: {
          isAdmin: false,
        },
      });
      return res.send({ ok: true, user });
    } catch (err) {
      console.log(err);

      return res.status(400).send({
        ok: false,
        id: req.query.id,
        message: "Record to remove admin role not found",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ ok: false, message: "Internal Server Error" });
  }
});
