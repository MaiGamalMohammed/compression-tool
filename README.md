# Huffpress

Huffpress is a command-line tool for compressing and decompressing files using Huffman encoding. Built for speed and memory efficiency, it allows you to reduce file size while preserving content integrity.

## 🚀 Installation

Before using the `compress` and `decompress` commands globally, make sure to link the tool locally:

```bash
npm link
```
📦 Usage

Compression

```bash
compress <inputFilePath> <outputFilePath>
```

Decompression

```bash
decompress <inputFilePath> <outputFilePath>
```

🔧 Developer Setup
```bash
git clone https://github.com/MaiGamalMohammed/compression-tool
cd huffpress
npm install
npm link
```
🧠 How It Works

-Huffpress builds a full frequency map from the source data

-A global Huffman tree is constructed from these frequencies

-The binary payload is encoded using the generated bit codes

-A header containing code map is stored using JSON.stringify(...) + "##end##"


Features:

Stream-Based Compression

-Processes input data chunk-by-chunk instead of loading the whole file

-Reduces peak memory usage dramatically for large files

-Enables future scalability to multi-GB files without crashing

Buffered Bit-to-Byte Conversion

-Aggregates encoded bits and writes full bytes in batches

-Minimizes internal buffering overhead and reduces write calls

-Leads to faster disk I/O and controlled memory spikes


📄 Notes
Recommended to avoid line-ending-sensitive delimiters; instead use "##end##" without newline
Supports large files without excessive memory usage
Built to evolve: easily extendable for CLI flags, performance benchmarking, or header validation tools

🧠 Author
Crafted by [Mai] — a backend engineer passionate about optimization, bit-level control, and scalable system design.

