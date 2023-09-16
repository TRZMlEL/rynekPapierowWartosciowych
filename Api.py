from urllib.request import urlopen

with open('data.txt') as f:
    contents = f.readlines()

while True:
    wynik=input("Wybierz: ")
    tel = {}
    proc = {}
    if wynik=="cena":
        for l in range(len(contents)):
            url = "https://www.bankier.pl/inwestowanie/profile/quote.html?symbol="+str(contents[l])
            page = urlopen(url)
            html_bytes = page.read()
            html = html_bytes.decode("utf-8")
            title_index = html.find('profilLast">')
            start_index = title_index + len('profilLast">')
            end_index = html.find("zł</div>")
            title = html[start_index:end_index]
            tel[contents[l].strip()]=float(title.strip().replace(',','.').replace('1&nbsp;',''))
        posortowane = sorted(tel.items(), key=lambda x:x[1])
        for i in posortowane:
            print(f"{i[0]} price: {i[1]} zł")

    if wynik=="procenty":
        for l in range(len(contents)):
            url = "https://www.bankier.pl/inwestowanie/profile/quote.html?symbol="+str(contents[l])
            page = urlopen(url)
            html_bytes = page.read()
            html = html_bytes.decode("utf-8")
            title_index = html.find('<td class="textAlignRight textNowrap change  up">')
            start_index = title_index + len('<td class="textAlignRight textNowrap change  up">')
            end_index = html.find("%</td>")
            title = html[start_index:start_index+5]
            proc[contents[l].strip()]=float(title.strip().replace(',','.').replace('%',''))
            print(contents[l].strip()+" Zmiana w skali 7dni: "+title)
        print(sorted(proc.items(), key=lambda x:x[1]))