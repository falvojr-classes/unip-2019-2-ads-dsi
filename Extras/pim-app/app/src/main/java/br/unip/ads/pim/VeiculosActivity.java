package br.unip.ads.pim;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import org.parceler.Parcels;

import java.util.List;

import br.unip.ads.pim.adapter.VeiculosAdapter;
import br.unip.ads.pim.domain.Usuario;
import br.unip.ads.pim.domain.Veiculo;
import br.unip.ads.pim.service.ApiSingleton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VeiculosActivity extends AppCompatActivity {

    private static final String TAG = VeiculosActivity.class.getSimpleName();

    public static final String EXTRA_USUARIO = "VeiculosActivity.usuario";

    private RecyclerView rvVeiculos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_veiculos);

        // Exemplo de uso do Parcelable (comentado)
        //Usuario usuarioLogado = Parcels.unwrap(getIntent().getParcelableExtra(EXTRA_USUARIO));

        rvVeiculos = findViewById(R.id.rvVeiculos);
        rvVeiculos.setHasFixedSize(true);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        rvVeiculos.setLayoutManager(layoutManager);

        carregarVeiculos();
    }

    private void carregarVeiculos() {
        ApiSingleton.get().getApiService().listarVeiculos().enqueue(new Callback<List<Veiculo>>() {
            @Override
            public void onResponse(Call<List<Veiculo>> call, Response<List<Veiculo>> response) {
                if (response.isSuccessful()) {
                    final List<Veiculo> veiculos = response.body();
                    //ArrayAdapter<Veiculo> adapter = new ArrayAdapter<>(VeiculosActivity.this, android.R.layout.simple_list_item_1, veiculos);

                    VeiculosAdapter adapter = new VeiculosAdapter(veiculos) {
                        @Override
                        public void onVeiculoClick(Veiculo veiculo) {
                            Log.d(TAG, String.format("Clicou no veiculo %s", veiculo.getId()));
                        }
                    };
                    rvVeiculos.setAdapter(adapter);
                } else {
                    // TODO Tratar erro da API...
                }
            }

            @Override
            public void onFailure(Call<List<Veiculo>> call, Throwable t) {
                // TODO Tratar erro inesperado...
            }
        });
    }
}
