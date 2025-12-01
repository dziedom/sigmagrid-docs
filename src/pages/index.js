import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout
      title="SigmaGrid — Institutional Fundamentals for Synthetic-Equity Perpetuals"
      description="SigmaGrid is the institutional fundamentals API for synthetic-equity perpetuals (SPY-PERP, QQQ-PERP, TSLA-PERP and more). Public docs live now — Paid API launching Q1 2026."
    >
      <main>
        <section className="hero--sigmagrid">
          <div className="signal-grid-orbit" />

          <div className="container">
            <div className="hero-banner">
              <span>API coming Q1 2026</span>
              <span>•</span>
              <span>Public docs live now — Paid API launching Q1 2026</span>
            </div>
            <h1>SigmaGrid</h1>
            <h2>The missing institutional anchor for 24/7 synthetic-equity perpetuals</h2>

            <p className="hero-subtitle">
              Institutional fundamentals for SPY-PERP, QQQ-PERP, TSLA-PERP and more.
              Delivered as clean, real-time JSON signals designed from day one for AI agents.
            </p>

            <div className="buttons">
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
              >
                Read the docs →
              </Link>
              <Link
                className="button button--outline button--lg"
                to="/docs/pricing"
              >
                Join the waitlist →
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--split">
          <div>
            <div className="section-kicker">Purpose</div>
            <h2 className="section-title">Institutional fundamentals for agent-driven markets</h2>
            <p className="section-lead">
              Traditional equity markets run on robust anchors: fair value, volatility forecasts, drift,
              regime classification, and event sensitivity. Crypto synthetic-equity perpetuals trade 24/7
              without those anchors.
            </p>
            <p className="section-lead" style={{ marginTop: '1rem', opacity: 0.9 }}>
              SigmaGrid supplies those institutional fundamentals as composable JSON feeds, so execution
              engines, quant desks, and AI agents can trust the context they are trading on.
            </p>
          </div>

          <div className="card">
            <div className="card-label">Base URL (when live)</div>
            <div className="card-title">https://api.sigmagrid.app</div>
            <p className="card-body" style={{ marginTop: '0.75rem' }}>
              Public documentation is live today. Paid API endpoints are scheduled to go live in Q1 2026.
              Pricing is stablecoin denominated per request via x402.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-kicker">Why SigmaGrid</div>
          <h2 className="section-title">From toy signals to institutional gravity</h2>
          <p className="section-lead">
            Most 24/7 synthetic-equity feeds are short backtests and thin features. SigmaGrid is built on
            deep cash-equity history, regime models that survived GFC, Covid, and 2022, and a schema that
            speaks natively to agents.
          </p>

          <div className="card-grid">
            <div className="card">
              <div className="card-label">Core</div>
              <div className="card-title">Mandatory institutional fields</div>
              <div className="card-body">
                Consistent fair value, volatility forecasts, drift, regime, and event context refreshed
                in real-time per ticker.
              </div>
            </div>
            <div className="card">
              <div className="card-label">Macro</div>
              <div className="card-title">Optional macro betas</div>
              <div className="card-body">
                Compressed sensitivities to macro regimes: <code>beta_macro</code>, <code>beta_yield</code>,
                <code>beta_dollar</code>, <code>beta_vol_index</code>.
              </div>
            </div>
            <div className="card">
              <div className="card-label">Agents</div>
              <div className="card-title">Designed for machine consumption</div>
              <div className="card-body">
                Stable JSON schema, per-request stablecoin pricing via x402, and explicit signal
                fields agents can route on immediately.
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

