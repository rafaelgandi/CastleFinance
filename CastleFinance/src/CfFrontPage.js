
class CfFrontPage extends HTMLElement {

    constructor() {
        super();
        this.lastScrollPos = 0;
    }

    connectedCallback() {
        this.render();
        this.$addButton = byId('add-account-button');
        this.$accountsCon = this.querySelector('.accounts-con');
        this.$blockquote = this.querySelector('blockquote');
        this.populate();
        this.events();
    }

    populate() {
        this.updateTotalBalance(sumOfAccounts());
        this.updateAccountsTiles(APP_DATA['accounts']);
    }

    updateTotalBalance(total) {
        this.querySelector('h1').innerHTML = /*html*/ `
            <sup>Total Balance</sup>
            ₱${formatNumber(total)}
        `;
    }

    updateAccountsTiles(accounts) {
        if (!accounts.length) {
            this.querySelector('.accounts-con').innerHTML = /*html*/`<label class="empty">No accounts yet</label>`;
        }
        else {
            this.querySelector('.accounts-con').innerHTML = accounts.map(({ iden, colorClass, emoji, name, transactions, exFromTotal }) => {
                let balance = sumOfTransactions(transactions);
                //console.log(balance);
                return /*html*/`
                    <cf-account-tile 
                        iden="${iden}"
                        bg="${colorClass}"
                        emoji="${emoji}"
                        name="${name}"
                        balance="${balance}"
                        exfromtotal="${(!!exFromTotal) ? 1 : 0}"
                    ></cf-account-tile>
                `;
            }).join('');
        }
    }

    onPageShow(e) {
        this.populate();
    }

    onAddAccountClick(e) {
        e.preventDefault();
        routeTo('add-edit-account-page');
    }

    refresh() {
        this.populate();
    }

    onScroll() {
        let yPos = window.scrollY;
        if (yPos > this.lastScrollPos) {
            this.$accountsCon.style.transform = `translateY(-40px)`;
            this.$blockquote.classList.add('show');
            // document.body.style.backgroundColor = '#000'; 
        }
        else {
            this.$accountsCon.style.transform = `translateY(0px)`; 
            // document.body.style.backgroundColor = 'purple';     
        }
        this.lastScrollPos = (yPos < 0) ? 0 : yPos; // Deal with negative scroll pos on mobile
        if (yPos === 0) {
            this.$blockquote.classList.remove('show');
        }      
    }

    events() {
        this.addEventListener('onPageShow', this.onPageShow.bind(this));
        this.$addButton.addEventListener('click', this.onAddAccountClick.bind(this));
        this.addEventListener('refresh', this.refresh.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    render() {
        
        this.innerHTML = /*html*/ `
            <div class="top-section no-select">
                <button id="add-account-button" class="sml-shadow">Add Account</button>
                <h1></h1>
            </div>          
            <div class="accounts-con"></div>
            <blockquote>
                "Spend less than you make."
            </blockquote>
            
        `;
    }

    disconnectedCallback() {
        this.removeEventListener('onPageShow', this.onPageShow);
        this.$addButton.removeEventListener('click', this.onAddAccountClick);
        this.removeEventListener('refresh', this.refresh.bind(this));
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }
}

customElements.define('cf-front-page', CfFrontPage);