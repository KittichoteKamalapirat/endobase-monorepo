import { urlResolver } from "../../lib/UrlResolver";

interface Props {
  text?: string;
  overlay?: boolean;
}

export const Error = ({ text }: Props) => {
  const homeUrl = urlResolver.index();
  return (
    <div>
      <p>Opps, there is an error</p>
    </div>
  );
};
