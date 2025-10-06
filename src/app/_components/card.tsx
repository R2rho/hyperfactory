export default function Card() {
  return (
    <div className="w-full h-[1200px] bg-foreground rounded-2xl">
      <h2 className="text-xl font-bold">Card Title</h2>
      <p className="text-sm text-gray-600">
        Additional details can be found below. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </p>
      <ul className="mt-4">
        <li className="border-b py-2">Item 1: Description of item 1</li>
        <li className="border-b py-2">Item 2: Description of item 2</li>
        <li className="border-b py-2">Item 3: Description of item 3</li>
        <li className="border-b py-2">Item 4: Description of item 4</li>
        <li className="border-b py-2">Item 5: Description of item 5</li>
      </ul>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
      <h3 className="text-lg font-semibold mt-8">Additional Section</h3>
      <p className="text-gray-500">
        Here you can include more detailed information or additional actions.
      </p>
      <div className="mt-4 bg-secondary p-4 rounded">
        <h4 className="font-medium">More Items:</h4>
        <p>Item A: Details about item A</p>
        <p>Item B: Details about item B</p>
        <p>Item C: Details about item C</p>
      </div>
    </div>
  );
}
