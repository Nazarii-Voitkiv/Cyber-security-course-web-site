import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    
    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section name and data are required' },
        { status: 400 }
      );
    }
    
    const edgeConfigUrl = process.env.EDGE_CONFIG;
    const token = process.env.EDGE_CONFIG_TOKEN;
    
    if (!edgeConfigUrl || !token) {
      return NextResponse.json(
        { success: false, error: 'Edge Config settings missing' },
        { status: 500 }
      );
    }
    
    const url = new URL(edgeConfigUrl);
    const configId = url.pathname.split('/').pop();
    
    const response = await fetch(`https://api.vercel.com/v1/edge-config/${configId}/items`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ operation: 'upsert', key: section, value: data }],
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { success: false, error: `Failed to update section: ${error}` },
        { status: response.status }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Section "${section}" updated successfully`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
