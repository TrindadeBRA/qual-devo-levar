import { useState } from 'react';

const Home: React.FC = () => {
  const [product1, setProduct1] = useState({
    sizeOrWeight: 0,
    unit: 'grama',
    price: 0,
    name: 'Produto 01',
  });

  const [product2, setProduct2] = useState({
    sizeOrWeight: 0,
    unit: 'grama',
    price: 0,
    name: 'Produto 02',
  });

  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [costPerUnit1, setCostPerUnit1] = useState<number | null>(null);
  const [costPerUnit2, setCostPerUnit2] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Conversão para a unidade padrão (grama ou litro)
    const convertedSizeOrWeight1 = convertToStandardUnit(product1);
    const convertedSizeOrWeight2 = convertToStandardUnit(product2);

    // Cálculo do preço por unidade
    const pricePerUnit1 = product1.price / convertedSizeOrWeight1;
    const pricePerUnit2 = product2.price / convertedSizeOrWeight2;

    // Comparativo de preços
    if (pricePerUnit1 < pricePerUnit2) {
      setComparisonResult(`${product1.name} é mais barato por unidade.`);
    } else if (pricePerUnit1 > pricePerUnit2) {
      setComparisonResult(`${product2.name} é mais barato por unidade.`);
    } else {
      setComparisonResult('Ambos os produtos têm o mesmo preço por unidade.');
    }

    // Atualizando informações de custo por unidade
    setCostPerUnit1(pricePerUnit1);
    setCostPerUnit2(pricePerUnit2);
  };

  const convertToStandardUnit = (product: any): number => {
    // Converte para a unidade padrão (grama ou litro)
    let convertedSizeOrWeight = product.sizeOrWeight;

    if (product.unit === 'quilo') {
      convertedSizeOrWeight *= 1000; // Converte para gramas
    } else if (product.unit === 'litro') {
      convertedSizeOrWeight *= 1000; // Converte para mililitros
    }

    return convertedSizeOrWeight;
  };

  const handleUnitChange = (unit: string) => {
    setProduct1({ ...product1, unit });
    setProduct2({ ...product2, unit });
  };

  return (
    <div className="p-4 bg-gray-100 text-black rounded-lg shadow-md h-[100vh]">

      <div className="">

        <h1 className="text-2xl font-bold mb-6 mt-4 text-center">Qual devo levar?</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

          <div className="mb-6">
            <h2 className="font-bold text-xl">Produto 1</h2>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Tamanho / Dimensões / Peso
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 sm:text-sm"
                    value={product1.unit}
                    onChange={(e) => handleUnitChange(e.target.value)}
                  >
                    <option value="grama">g</option>
                    <option value="quilo">kg</option>
                    <option value="mililitro">ml</option>
                    <option value="litro">L</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder=""
                  value={product1.sizeOrWeight}
                  onChange={(e) => setProduct1({ ...product1, sizeOrWeight: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Preço
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-9 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  value={product1.price}
                  onChange={(e) => setProduct1({ ...product1, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl">Produto 2</h2>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Tamanho / Dimensões / Peso
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 sm:text-sm"
                    value={product2.unit}
                    onChange={(e) => handleUnitChange(e.target.value)}
                  >
                    <option value="grama">g</option>
                    <option value="quilo">kg</option>
                    <option value="mililitro">ml</option>
                    <option value="litro">L</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder=""
                  value={product2.sizeOrWeight}
                  onChange={(e) => setProduct2({ ...product2, sizeOrWeight: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Preço
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-9 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  value={product2.price}
                  onChange={(e) => setProduct2({ ...product2, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Comparar
          </button>
        </form>

      {comparisonResult && (

        <div className="bg-gray-300 p-4 mt-6 rounded-md shadow-md">
          {/* Resultado da comparação */}
          {comparisonResult && (
            <div className="text-center text-green-600 font-semibold">
              {comparisonResult}
            </div>
          )}

          {/* Custo por unidade */}
          {costPerUnit1 !== null && costPerUnit2 !== null && (
            <div className="mt-4 text-center">
              <p>{`Custo por ${product1.unit} do ${product1.name}: R$${costPerUnit1.toFixed(3)}`}</p>
              <p>{`Custo por ${product1.unit} do ${product2.name}: R$${costPerUnit2.toFixed(3)}`}</p>
            </div>
          )}
        </div>

      )}


      </div>


    </div>
  );
};

export default Home;
