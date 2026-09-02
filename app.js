document.getElementById("processBtn").addEventListener("click", async () => {
  const input = document.getElementById("folderInput");
  const files = input.files;
  const outputTextarea = document.getElementById("output");

  if (files.length === 0) {
    alert("폴더를 선택하십시오.");
    return;
  }

  let result = "= Repository Structure =\n\n";
  const ignorePatterns = [
    "node_modules/",
    ".git/",
    ".DS_Store",
    "package-lock.json",
  ];

  // 1. 트리 구조 생성
  for (let file of files) {
    const path = file.webkitRelativePath;
    if (ignorePatterns.some((pattern) => path.includes(pattern))) continue;
    result += `- ${path}\n`;
  }

  result += "\n=========================================\n";
  result += "= Repository Files Content =\n";
  result += "=========================================\n\n";

  // 2. 파일 내용 텍스트 추출 및 결합
  for (let file of files) {
    const path = file.webkitRelativePath;
    if (ignorePatterns.some((pattern) => path.includes(pattern))) continue;

    try {
      const content = await file.text();
      result += `=========================================\n`;
      result += `File: ${path}\n`;
      result += `=========================================\n`;
      result += `${content}\n\n`;
    } catch (e) {
      result += `[Binary or Unreadable File: ${path}]\n\n`;
    }
  }

  outputTextarea.value = result;
});
