const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    } ,
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=874&auto=format&fit=crop",
            set: (v) =>
            v === ""
                ? "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=874&auto=format&fit=crop"
                : v,
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
  geometry: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number], // [lng, lat]
  },
},
});

listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});      
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

