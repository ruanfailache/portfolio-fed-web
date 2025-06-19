import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const url = searchParams.get("url");
    const filename = searchParams.get("filename") ?? "download.pdf";

    if (!url || !url.startsWith("https://")) {
        return new Response(JSON.stringify({ error: 'Param "url" is invalid.' }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (!filename.endsWith(".pdf")) {
        return new Response(JSON.stringify({ error: "The file should be a PDF." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const response = await fetch(url);

        if (!response.ok || !response.body) {
            return new Response(JSON.stringify({ error: "Failed to fetch file." }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(response.body, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Type": response.headers.get("content-type") || "application/pdf",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Error downloading file." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
