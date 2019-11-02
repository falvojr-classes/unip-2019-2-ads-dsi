package br.unip.ads.pim.service;

import java.util.List;

import br.unip.ads.pim.domain.Usuario;
import br.unip.ads.pim.domain.Veiculo;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiService {

    @POST("login")
    Call<Usuario> logar(@Body Usuario credenciais);

    @GET("veiculos")
    Call<List<Veiculo>> listarVeiculos();
}
