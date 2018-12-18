import * as React from "react";
const { useEffect, useRef, useState } = React;
import { SearchResult } from "../lib/types";

interface Props {
  result: SearchResult;
}

const ListItem = ({ value, label }) => (
  <>
    <dt className="py-1 uppercase text-xs text-grey-darker w-1/3 inline-flex items-start bg-red">{label}</dt>
    <dd className="py-1 text-sm" style={{ width: "calc(66% - 8px)" }}>
      {value}
    </dd>
  </>
);

const MobileSpecItem = ({ value, label }) => (
  <span>
    <dt className="text-xs text-grey uppercase my-1 text-center ">{label}</dt>
    <dd className="text-md font-bold text-center">{value}</dd>
  </span>
);

const Card: React.SFC<Props> = ({ result }) => {
  const [visible, setVisible] = useState(false);
  const node = useRef(null);

  useEffect(() => {
    const el = node.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // once the element is visible, drop the observer
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px 0px 0px 0px" }
    );

    observer.observe(el);

    return () => observer.unobserve(el);
  }, []);

  return (
    <>
      <div
        ref={node}
        className="bg-white shadow-md flex my-2 rounded-lg overflow-hidden md:h-64 h-auto flex-col md:flex-row"
      >
        <div className="md:flex md:flex-col justify-between lg:w-64 md:w-48 w-full">
          <div
            id="i2"
            style={{
              backgroundImage: visible ? `url(${result.tour_image})` : null
            }}
            className="h-0 bg-cover bg-center pt-73/100 lg:pt-6/10 xl:pt-1/2  "
            role="img"
          />

          <div
            style={{
              paddingTop: "calc(400 / 928 * 100%) ",
              backgroundImage: visible ? `url(${result.map_image})` : null
            }}
            className="h-0 bg-cover bg-center"
            role="img"
          />
          <div className="absolute" />
        </div>
        <div className="flex-1 p-2 md:p-5 flex justify-between flex-col border-grey border-t sm:border-0">
          <h2 className="">{result.tour_name}</h2>
          <span>{result.description}</span>
          <dl className="flex flex-wrap">
            <ListItem label="Destinations" value={result.destinations.join(", ")} />
            <ListItem
              label="Starts/End"
              value={`${result.destinations[0]} / ${result.destinations[result.destinations.length - 1]}`}
            />
            <ListItem label="Age range" value={`${result.age_from} to ${result.age_to} years old`} />
            <ListItem label="Country" value={result.country} />
            <ListItem label="Operator" value={result.tour_operator} />
          </dl>
        </div>
        <div className="p-5 w-48 hidden md:block">
          <div className="flex">
            <div className="text-left">
              <dt className="text-xs uppercase">Our saving</dt>
              <dd>€{result.saving}</dd>
            </div>
            <span className="flex-1" />
            <div className="text-right">
              <dt className="text-xs uppercase font-bold">From</dt>
              <dd className="text-lg font-bold">€{result.price_eur}</dd>
            </div>
          </div>
          <div className="md:border-t md:border-b border-grey font-bold p-2 my-2 flex items-center justify-center text-md">
            {result.length} days
          </div>
        </div>
        <div className="p-3 flex md:hidden border-grey border-t justify-around">
          <MobileSpecItem label="Our saving" value={`€${result.saving}`} />
          <MobileSpecItem label="From" value={`€${result.price_eur}`} />
          <MobileSpecItem label="Duration" value={`${result.length} days`} />
        </div>
      </div>
      {}
    </>
  );
};

export default Card;
