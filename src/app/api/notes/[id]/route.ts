import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params{
    params:{
        id: string
    };
}
export async function GET(request:Request, {params}: Params){
    try{
        const note=await prisma.note.findFirst(
            {
                where:{
                    id: Number(params.id),

                },
            } );

            if (!note)
            return NextResponse.json({ message: "Note not found"},{status:404})

    }catch(error){
        if (error instanceof Error){
            return NextResponse.json(
            {
                message:'error.message',
            }, 
            {
                status:500,
            }
            
            
            );  
        }

    }
    return NextResponse.json({
        message:'getting single notes...',
    })
}

export async function DELETE(request:Request, {params}: Params){
    try{
        const deletedNote=await prisma.note.delete(
            {
                where:{
                    id: Number(params.id),

                },
            } );

            if (!deletedNote)
            return NextResponse.json({ message: "Note not found"},{status:404});

            return NextResponse.json(deletedNote);

    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error.code, error.message)
            return NextResponse.json(
            {
                message:'error.message',
            }, 
            {
                status:500,
            }
            
            
            );  
        }

    }}
   


    export async function PUT(request:Request, {params}: Params){
        try{
            const{title,content}= await request.json();
            const updatedNote=await prisma.note.update(
                {
                    where:{
                        id: Number(params.id),
    
                    },
                    data:{
                        title,
                        content,
                    }
                } );
    
    
                return NextResponse.json(updatedNote);
    
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === "P2025")
                console.log(error.code, error.message)
                return NextResponse.json(
                {
                    message:"Note not found",
                }, 
                {
                    status:404,
                }
                
                
                );  
                return NextResponse.json(
                    {
                        message:'error.message',
                    }, 
                    {
                        status:500,
                    }
                    
                    
                    );  
            }
    
        }}
       
    