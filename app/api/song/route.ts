import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/mongo/db";
import Song from "@/lib/mongo/models/Song";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        user_id,
        title,
        author,
        image_path,
        song_path,
    } = body;

    let jsonResponse = { status: "failed"};

    const user = await getCurrentUser(user_id);
    if (user?._id) {
        await db.connect();
        const song = new Song();
        song.user_id = user._id;
        song.title = title;
        song.author = author;
        song.image_path = image_path;
        song.song_path = song_path;
        await song.save(); 
          
        jsonResponse = {
            status: "success",
        };
    }

    return NextResponse.json(jsonResponse);
  }