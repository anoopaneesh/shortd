import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";


export type AnalyticsModel = HydratedDocument<Analytics>

type GeoLocation = { country: string, city: string, latitude: number, longitude: number }

const GeoLocationRaw = raw({
    country: {
        type: String
    }, city: { type: String }, latitude: { type: Number }, longitude: { type: Number }
})

type Device = { browser: string, os: string, device: string }

const DeviceRaw = raw({
    browser: {
        type: String
    },
    os: {
        type: String
    },
    device: {
        type: String
    }
})

@Schema({ collection: "analytics", timestamps: true })
export class Analytics {

    @Prop({ required: true })
    sid: string

    @Prop({ required: true, type: Date })
    timestamp: Date

    @Prop({ required: true })
    ipAddress: string

    @Prop({ required: true })
    userAgent: string

    @Prop({ required: false })
    referrer: string

    @Prop({ required: true, type: GeoLocationRaw })
    geoLocation: GeoLocation

    @Prop({ required: true, type: DeviceRaw })
    device: Device

    createdAt: Date

    updatedAt: Date
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics)