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

    // Comparativo de preços Logs
    if (pricePerUnit1 < pricePerUnit2) {
      console.log(`${product1.unit} de ${product1.name} é mais barato por unidade.`);
    } else if (pricePerUnit1 > pricePerUnit2) {
      console.log(`${product2.unit} de ${product2.name} é mais barato por unidade.`);
    } else {
      console.log('Ambos os produtos têm o mesmo preço por unidade.');
    }

    // Comparativo de preços
    if (pricePerUnit1 < pricePerUnit2) {
      setComparisonResult(`${product1.unit} de ${product1.name} é mais barato por unidade.`);
    } else if (pricePerUnit1 > pricePerUnit2) {
      setComparisonResult(`${product2.unit} de ${product2.name} é mais barato por unidade.`);
    } else {
      setComparisonResult('Ambos os produtos têm o mesmo preço por unidade.');
    }

    // Logs de custo por unidade
    console.log(`Custo por unidade de ${product1.name}: R$${pricePerUnit1.toFixed(3)}`);
    console.log(`Custo por unidade de ${product2.name}: R$${pricePerUnit2.toFixed(3)}`);

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
    <div className="container mx-auto mt-8 p-4 bg-gray-100 text-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Qual Devo Levar?</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Produto 1</label>
          <div className="flex gap-4">
            <select
              value={product1.unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="grama">g</option>
              <option value="quilo">kg</option>
              <option value="mililitro">ml</option>
              <option value="litro">L</option>
            </select>
            <input
              type="number"
              placeholder="Tamanho/Peso"
              value={product1.sizeOrWeight}
              onChange={(e) => setProduct1({ ...product1, sizeOrWeight: parseFloat(e.target.value) })}
              className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-700">
                R$
              </span>
              <input
                type="number"
                placeholder="Preço"
                value={product1.price}
                onChange={(e) => setProduct1({ ...product1, price: parseFloat(e.target.value) })}
                className="pl-7 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Produto 2</label>
          <div className="flex gap-4">
            <select
              value={product2.unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="grama">g</option>
              <option value="quilo">kg</option>
              <option value="mililitro">ml</option>
              <option value="litro">L</option>
            </select>
            <input
              type="number"
              placeholder="Tamanho/Peso"
              value={product2.sizeOrWeight}
              onChange={(e) => setProduct2({ ...product2, sizeOrWeight: parseFloat(e.target.value) })}
              className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-700">
                R$
              </span>
              <input
                type="number"
                placeholder="Preço"
                value={product2.price}
                onChange={(e) => setProduct2({ ...product2, price: parseFloat(e.target.value) })}
                className="pl-7 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Comparar Preços
        </button>
      </form>

      {/* Resultado da comparação */}
      {comparisonResult && (
        <div className="mt-6 text-center text-green-600 font-semibold">
          {comparisonResult}
        </div>
      )}

      {/* Custo por unidade */}
      {costPerUnit1 !== null && costPerUnit2 !== null && (
        <div className="mt-4 text-center">
          <p>{`Custo por unidade de ${product1.name}: R$${costPerUnit1.toFixed(3)}`}</p>
          <p>{`Custo por unidade de ${product2.name}: R$${costPerUnit2.toFixed(3)}`}</p>
        </div>
      )}

    </div>
  );
};

export default Home;
