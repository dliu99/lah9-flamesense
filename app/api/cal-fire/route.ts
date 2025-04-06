//import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch('https://incidents.fire.ca.gov/umbraco/api/IncidentApi/GeoJsonList?inactive=true', {
      method: 'GET',
      headers: {
        // Add any required headers for authentication, etc.
        //Authorization: `Bearer YOUR_API_KEY`
      }
    });

    if (!response.ok) {
      throw new Error('issue with cal fire api');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fire data', message: (error as Error).message }, { status: 500 });
  }
}
