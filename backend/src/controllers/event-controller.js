import { events } from "../data/events.js";
import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

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
            return res.status(404)
                .json({ error: { message: "Event not found" } });
        }

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404)
                .json({ error: { message: "Event not found" } });
        }

        res.json(event);
    } catch (err) {
        next(err);
    }
}

export function createEvent(req, res) {
    const {
        title,
        category,
        capacity,
        date,
        time,
        location,
        description
    } = req.body ?? {};

    if (!title || !category || !date) {
        return res.status(400).json({
            error: {
                message: "title, category and date are required"
            }
        });
    }

    const newEvent = {
        id: `event-${Date.now()}`,
        title,
        category,
        date,
        capacity: Number(capacity) || 0,
        time: time ?? "",
        location: location ?? "",
        description: description ?? "",
    };

    events.push(newEvent);

    res.status(201).json(newEvent);
}
