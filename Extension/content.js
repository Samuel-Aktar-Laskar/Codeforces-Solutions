
const url = window.location.href
let problem_id = null
let problem_name = null

const seeSolutions = ()=>{
    const button = document.createElement("button")
    button.innerHTML = "See Solutions"
    button.className = "button-style"
    button.addEventListener("click",()=>{
        try{
            const redirect_url = `https://github.com/Samuel-Aktar-Laskar/Codeforces-Solutions/issues?q=${problem_id}+in:title&sort=reactions&order=desc`
            window.open(redirect_url,"_blank")
        }
        catch (e){
            console.error('Error in viewing solutions ', e)
        }
    })
    const side_div = document.getElementById("sidebar")
    if (side_div){
        side_div.appendChild(button)
    }
}

const writeSolution = ()=>{
    const button = document.createElement("button")
    button.className = "button-style"
    button.innerHTML = "Write Solution"
    button.addEventListener("click",()=>{
        try{
            const redirect_url = `https://github.com/Samuel-Aktar-Laskar/Codeforces-Solutions/issues/new?labels=answer,en&title=${problem_id} - ${problem_name ? problem_name : ''}&body=${GetSolutionTemplate('Paste your code here')}`
            window.open(redirect_url,"_blank")
        }
        catch (e){
            console.error(e)
        }
    })
    const side_div = document.getElementById("sidebar")
    if (side_div){
        side_div.appendChild(button)
    }
}

if (window.location.href.includes("https://codeforces.com/problemset/problem/")){
    seeSolutions()
    writeSolution()
    const match = url.match(/\/problemset\/problem\/(\d+)\/([A-Z])/);

    try {
        problem_id = match[1]+match[2]
    }
    catch (e){
        console.error('Could not extract problem id ',e)
    }
    console.log(`The extracted problem id :${problem_id}.`)
    try{
        const title_div = document.getElementsByClassName('title')[0]
        if (title_div){
            const title_text = title_div.innerHTML
            problem_name = title_text.substring(3)
        }
    }
    catch (e){
        console.error('Could not extract problem name ',e)
    }

}


const GetSolutionTemplate = (code)=>{
    return encodeURIComponent(`
<!--Note: Please do not remove the question no (Example 1916C) from the title, it used to find solutions-->
# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->


# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
\`\`\`
${code}
\`\`\`
`)
}

