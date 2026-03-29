import { redirect } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default function PropiedadesBaDetailRedirect({ params }: PageProps) {
  redirect(`/inmobiliaria/${params.id}`);
}
