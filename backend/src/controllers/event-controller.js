import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

const KORUNAN_ALANLAR = [
    "_id",
    "createdAt",
    "updatedAt",
    "__v"
];

export async function getEvents(req, res, next) {
    try {
        const filter = req.query.category
            ? { category: req.query.category }
            : {};

        const events = await Event.find(filter).sort({ date: 1 });

        res.json(events);
    } catch (err) {
        next(err);
    }
}

export async function getEventById(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return notFound(res);
        }

        const event = await Event.findById(req.params.id);

        if (!event) {
            return notFound(res);
        }

        res.json(event);
    } catch (err) {
        next(err);
    }
}

export async function createEvent(req, res, next) {
    try {
        const event = await Event.create(req.body ?? {});

        res.status(201).json(event);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400)
                .json({ error: { message: err.message } });
        }

        next(err);
    }
}


export async function updateEvent(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return notFound(res);
        }

        const body = req.body ?? {};

        if (Object.keys(body).length === 0) {
            return res.status(400)
                .json({ error: { message: "Body is empty" } });
        }

        const korunan = Object.keys(body)
            .filter((k) => KORUNAN_ALANLAR.includes(k));

        if (korunan.length > 0) {
            return res.status(400)
                .json({
                    error: {
                        message: `${korunan.join(", ")} cannot be changed`
                    }
                });
        }

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!event) return notFound(res);

        res.json(event);

    } catch (err) {
        if (
            err.name === "ValidationError" ||
            err.name === "CastError"
        ) {
            return res.status(400)
                .json({ error: { message: err.message } });
        }

        next(err);
    }
}


function notFound(res) {
    return res.status(404)
        .json({ error: { message: "Event not found" } });
}