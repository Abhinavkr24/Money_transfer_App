<PageWrapper>
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Transfer Funds
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Recipient Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
            Send Money
          </button>
        </div>
      </div>
    </PageWrapper>