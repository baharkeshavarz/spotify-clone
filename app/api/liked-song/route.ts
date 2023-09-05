import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/mongo/db";
import LikedSong from "@/lib/mongo/models/LikedSong";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")
  const songId = url.searchParams.get("songId")

  let likedSong = null;
  if (userId && songId) {
      const user = await getCurrentUser(userId!);
      if (user) {
        await db.connect();
        likedSong = await LikedSong.findOne({user_id: user._id, song_id: songId});
      }
  }
 
  let json_response = {
      status: "success",
      liked: likedSong ? true: false,
    };

    return NextResponse.json(json_response);
  }


export async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const songId = url.searchParams.get("songId")

  await db.connect();
  await LikedSong.deleteOne({song_id: songId});

  let json_response = {
    status: "success",
  };

  return NextResponse.json(json_response);
}


export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
      user_id,
      song_id,
  } = body;

  let jsonResponse = { status: "failed"};
  const user = await getCurrentUser(user_id);

  if (user_id) {
    await db.connect();
    const song = new LikedSong();
    song.user_id = user._id;
    song.song_id = song_id;
    await song.save(); 
      
    jsonResponse = { status: "success" };
  }

  return NextResponse.json(jsonResponse);
}