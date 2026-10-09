export default async function ThemePage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

return ( <main> <h1>Thème : {slug}</h1> </main>
);
}
