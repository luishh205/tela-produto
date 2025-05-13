import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import axios from "axios";

// simula os dados da API
const product = {
  title: "Tênis Esportivo Masculino",
  price: 199.99,
  images: [
    "/img/img(1).jpeg",
    "/img/img(2).jpeg",
    "/img/img(3).jpeg",
    "/img/img(4).jpeg",
    "/img/img(5).jpeg",
  ],
  sizes: ["36", "37", "38", "39", "40"],
  colors: ["Preto", "Branco", "Azul"]
};

const STORAGE_KEY = "product_selection";

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && Date.now() - stored.timestamp < 15 * 60 * 1000) {
      setSelectedImage(stored.selectedImage);
      setSelectedSize(stored.selectedSize);
      setSelectedColor(stored.selectedColor);
      setCep(stored.cep);
      setAddress(stored.address);
    }
  }, []);

  useEffect(() => {
    const data = {
      selectedImage,
      selectedSize,
      selectedColor,
      cep,
      address,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [selectedImage, selectedSize, selectedColor, cep, address]);

  const checkCEP = async () => {
    if (cep.length === 8) {
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!res.data.erro) setAddress(res.data);
        else setAddress(null);
      } catch {
        setAddress(null);
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded mt-5">
      <div className="flex flex-col md:flex-row gap-10">

        <div className="md:w-1/3">
          <img
              src={selectedImage}
              className="w-full h-[400px] object-contain  rounded shadow"
            />
          <div className="flex mt-4 gap-2">
            {product.images.map((img, i) => (
              <img
                  key={i}
                  src={img}
                  className={`w-16 h-16 object-contain object-center rounded cursor-pointer border bg-white ${
                    selectedImage === img ? "border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
            ))}
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
          <p className="text-xl text-green-600 mb-4">R$ {product.price}</p>

          <div className="mb-4">
            <label className="font-medium block mb-1">Tamanho:</label>
            <select
              className="border p-2 w-full rounded"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Selecione o tamanho</option>
              {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="font-medium block mb-1">Cor:</label>
            <select
              className="border p-2 w-full rounded"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Selecione a cor</option>
              {product.colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="font-medium block mb-1">Consultar Frete (CEP):</label>
            <input
              type="text"
              maxLength={8}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={checkCEP}
              placeholder="Ex: 30140071"
              className="border p-2 w-full rounded"
            />
            {address && (
              <p className="text-sm text-gray-700 mt-2">
                {address.logradouro}, {address.bairro} — {address.localidade}/{address.uf}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
              onClick={() => toast.success("Produto adicionado ao carrinho!")}
            >
              Adicionar ao Carrinho
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
              onClick={() => toast.success("Produto comprado!")}
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
