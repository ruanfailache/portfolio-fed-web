import { NextRequest } from "next/server";
import https from "https";

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

    return new Promise((resolve, reject) => {
        https
            .get(url, (fileRes) => {
                const headers = new Headers();
                headers.set("Content-Disposition", `attachment; filename="${filename}"`);
                headers.set("Content-Type", fileRes.headers["content-type"] || "application/pdf");

                resolve(
                    new Response(fileRes as any, {
                        status: 200,
                        headers,
                    }),
                );
            })
            .on("error", () => {
                reject(
                    new Response(JSON.stringify({ error: "Error on PDF's download." }), {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    }),
                );
            });
    });
}
