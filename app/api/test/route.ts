import db from "@/lib/mongo/db";
import Song from "@/lib/mongo/models/Song";
import User from "@/lib/mongo/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import LikedSong from "@/lib/mongo/models/LikedSong";

export async function GET(request: NextRequest) {
    await db.connect();
    // const doc = new Song();
    // doc.title = "Lovers Songs";
    // doc.active = true;
    // doc.user_id="64e6f07dde00b770fef9b37a";
    // doc.author = "The Lover"
    // doc.image_path="music7.jpeg"
    // const doc = new User();
    // doc.email = "bahar.keshavarzc@gmail.com";
    // doc.image ="myimage.jpg"
    // doc.password= await bcrypt.hash("123456", 12);
    // doc.first_name="Bahar";
    // doc.last_name="Keshavarz";



    const doc = new LikedSong();
    doc.user_id = "64e8b2aa5b98943be995a7f3";
    doc.song_id="64e8369bfa06250ce7aa2500";
    await doc.save(); 
      
    let json_response = {
      status: "success",
      data: "hi"
    };
    return NextResponse.json(json_response);
  }