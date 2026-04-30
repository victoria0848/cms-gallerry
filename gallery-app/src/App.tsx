import { useEffect, useState } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: "qqja2r9x4dun",
  accessToken: "WaydgeQo4qH3w0xvfDIdE9oB_Y8lemEWssNM5L1hU_I",
});

export default function App() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    client
      .getEntries({ content_type: "galleryitem" }) // vigtigt: samme navn!
      .then((res) => {
        setItems(res.items);
      });
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dish Gallery</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {items.map((item) => (
          <div key={item.sys.id}>
            <img
              src={"https:" + item.fields.image.fields.file.url}
              alt={item.fields.title}
              style={{ width: "100%" }}
            />
            <h3>{item.fields.title}</h3>
            <p>{item.fields.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}