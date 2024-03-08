import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const tenantFound = await db.tenant.findUnique({
      where: {
        rfc: data.rfc,
      },
    });

    if (tenantFound) {
      return NextResponse.json(
        {
          message: "Tenant already exits",
        },
        {
          status: 400,
        }
      );
    }

    const newTenant = await db.tenant.create({ data });
    return NextResponse.json(newTenant);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const tenants = await db.tenant.findMany();
    return NextResponse.json(tenants);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
