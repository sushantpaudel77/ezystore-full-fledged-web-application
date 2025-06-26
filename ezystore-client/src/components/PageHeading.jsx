import PageTitle from "./PageTitle";

export default function PageHeading({ title, children }) {
  return (
    <div className="text-center max-w-[640px] mx-auto px-4 py-4">
      <PageTitle title={title} />
      <p className="font-primary mt-4 text-base md:text-lg leading-relaxed text-gray-700 dark:text-light opacity-90">
        {children}
      </p>
    </div>
  );
}
